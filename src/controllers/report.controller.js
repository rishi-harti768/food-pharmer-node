import express from "express";
import pool from "../db/database.js";
import { charRecognize } from "../utils/OCR.js";
import fs from "fs";

export const newReport = async (req, res) => {
  try {
    const upload_time = req.file.filename.split(".")[0];
    const imageFileName = req.file.filename;
    res.status(200).json({ message: "Report created" });
    const ocrFileName = req.file.filename.split(".")[0] + ".txt";
    await charRecognize(imageFileName, ocrFileName);
    const newReport = await pool.query(
      "INSERT INTO reports (upload_time, image, ocr_text) VALUES ($1, $2, $3);",
      [imageFileName, upload_time, ocrFileName]
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
