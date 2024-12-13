import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const charRecognize = async (image, txt) => {
  image = `${process.env.HOST_URL}reportImgs/${image}`;
  txt = `public/ocr-text/${txt}`;
  const reader = await Tesseract.recognize(image, "eng");
  let result = reader.data.text;
  fs.writeFileSync(txt, result);
};

export const readImage = async (image, txt) => {
  image = `${process.env.HOST_URL}reportImgs/${image}`;
  txt = `public/ocr-text/${txt}`;
  const worker = await createWorker();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(image);
  await worker.terminate();
  fs.writeFileSync(txt, text);
  return text;
};
