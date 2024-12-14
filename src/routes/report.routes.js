import express from "express";
import {
  fetchAllReports,
  fetchReport,
  newReport,
} from "../controllers/report.controller.js";
import upload from "../middleware/fileupload.js";

const router = express.Router();

router.post("/new", upload.single("reportImg"), newReport);
router.post("/fetch-all-reports", fetchAllReports);
router.post("/fetch-report", fetchReport);

export default router;
