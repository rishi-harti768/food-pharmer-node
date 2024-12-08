import express from "express";
import { newReport } from "../controllers/report.controller.js";
import upload from "../middleware/fileupload.js";

const router = express.Router();

router.post("/new", upload.single("reportImg"), newReport);

export default router;
