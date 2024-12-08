import Tesseract from "tesseract.js";
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
