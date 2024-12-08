import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});
export const genImgReport = async (image) => {
  const fileBuffer = await fs.readFileSync(image);
  openai.files
    .create({
      file: image,
      purpose: "input",
    })
    .then((response) => {
      const fileId = response.data.id;
      console.log(`File uploaded with ID: ${fileId}`);

      // Use the file ID in your OpenAI API call
      // For example:
      const prompt = "Summarize the content of the uploaded file";
      const model = "text-davinci-003";

      openai.completions
        .create({
          model: model,
          prompt: prompt,
          file: fileId,
        })
        .then((response) => {
          const summary = response.data.choices[0].text;
          console.log(`Summary: ${summary}`);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};
