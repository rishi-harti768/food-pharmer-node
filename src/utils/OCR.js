import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const readImage = async (image, txt) => {
  image = `${process.env.HOST_URL}reportImgs/${image}`;
  txt = `public/ocr-text/${txt}`;
  const worker = await createWorker();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text, confidence },
  } = await worker.recognize(image);
  await worker.terminate();
  fs.writeFileSync(txt, text);
  return { text, confidence };
};
