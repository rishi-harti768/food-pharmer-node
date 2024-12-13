import express from "express";
import {
  fetchAllReports,
  newReport,
} from "../controllers/report.controller.js";
import upload from "../middleware/fileupload.js";
import pool from "../db/database.js";

const router = express.Router();

router.post("/new", upload.single("reportImg"), newReport);
router.post("/fetch-all-reports", fetchAllReports);
router.post("/test", async (req, res) => {
  const query = await pool.query("SELECT analysis FROM reports where id = 2;");
  console.log(query.rows[0].analysis);
  res.json(query.rows[0].analysis);
});

export default router;
