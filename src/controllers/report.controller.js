import express from "express";
import pool from "../db/database.js";
import { readImage } from "../utils/OCR.js";
import fs from "fs";
import dotenv from "dotenv";
import { analyseLabel } from "../utils/geminiServices.js";

dotenv.config();

export const newReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const { product_name } = req.body;

    if (!product_name) {
      return res.status(400).json({ message: "Product name not provided" });
    }

    const upload_time = req.file.filename.split(".")[0];
    const imageFileName = req.file.filename;
    const ocrFileName = req.file.filename.split(".")[0] + ".txt";

    if (!imageFileName || !ocrFileName) {
      return res.status(400).json({ message: "Invalid file name" });
    }

    const { text, confidence } = await readImage(imageFileName, ocrFileName);

    const analysis = await analyseLabel(text);

    const newReport = await pool.query(
      "INSERT into reports (product_name, upload_time, image, image_quality, ocr_text, analysis) VALUES ($1, $2, $3, $4, $5, $6);",
      [
        product_name,
        upload_time,
        imageFileName,
        confidence,
        ocrFileName,
        analysis,
      ]
    );

    res.status(200).json({ message: "Report created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchAllReports = async (req, res) => {
  try {
    let allReports = await pool.query(
      "SELECT id, product_name, upload_time, image_quality, image FROM reports;"
    );
    allReports.rows.forEach((report) => {
      report.upload_time = new Date(Date(report.upload_time).toString());
      report.image = `/reportImgs/${report.image}`;
    });
    res.status(200).json(allReports.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ message: "Report id not provided" });
    }
    const report = await pool.query("SELECT * FROM reports WHERE id = $1;", [
      id,
    ]);
    if (report.rows.length != 1) {
      res.status(400).json({ message: "Report not found" });
      return;
    }
    // format upload_time
    report.rows[0].upload_time = new Date(
      Date(report.rows[0].upload_time).toString()
    );

    // reframe image url
    report.rows[0].image = `/reportImgs/${report.rows[0].image}`;

    // detected text
    report.rows[0].ocr_text = fs
      .readFileSync("public/ocr-text/" + report.rows[0].ocr_text)
      .toString();
    res.status(200).json(report.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
