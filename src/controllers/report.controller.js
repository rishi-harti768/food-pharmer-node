import express from "express";
import pool from "../db/database.js";
import { charRecognize, readImage } from "../utils/OCR.js";
import fs from "fs";
import dotenv from "dotenv";
import { analyseLabel } from "../utils/geminiServices.js";

dotenv.config();

export const newReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const upload_time = req.file.filename.split(".")[0];
    const imageFileName = req.file.filename;
    const ocrFileName = req.file.filename.split(".")[0] + ".txt";

    if (!imageFileName || !ocrFileName) {
      return res.status(400).json({ message: "Invalid file name" });
    }

    const text = await readImage(imageFileName, ocrFileName);

    const analysis = await analyseLabel(text);

    const newReport = await pool.query(
      "INSERT into reports (upload_time, image, ocr_text, analysis) VALUES ($1, $2, $3, $4);",
      [upload_time, imageFileName, ocrFileName, analysis]
    );

    res.status(200).json({ message: "Report created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchAllReports = async (req, res) => {
  try {
    let allReports = await pool.query("SELECT * FROM reports;");
    allReports.rows.forEach((report) => {
      report.image = `/reportImgs/${report.image}`;
      report.upload_time = Date(report.upload_time);
      report.ocr_text = fs
        .readFileSync(`public/ocr-text/${report.ocr_text}`)
        .toString();
    });
    res.status(200).json(allReports.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
