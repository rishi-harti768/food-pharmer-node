import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const analyseLabel = async (labelTxt) => {
  const prompt = `
    You are a food inspector. You are given a OCR extracted text of a nutrition label of a food product.
    Your task is to analyze the nutritional profile of the food product and provide a recommendation on whether it is healthy or unhealthy or very unhealty. You can also format given text if its inaccurate or not complete.

    - OCR extracted text of a nutrition label: ${labelTxt}

    Important: Please keep in mind that you should respond in json format, like in the following:

    {
        "summary": "a short summary of the nutritional profile of the food product, (max 20 words)",
        "ingredientsAnalysis": [
            {
                "name": "name of the ingredient",
                "quantity": "quantity of the ingredient",
                "safetyLevel": "Healthy" | "Unhealthy" | "Very Unhealthy",
                "feedback": "a short feedback on the safety of the ingredient",
            },
            {
                "name": "name of the ingredient",
                "quantity": "quantity of the ingredient",
                "safetyLevel": "Healthy" | "Unhealthy" | "Very Unhealthy",
                "feedback": "a short feedback on the safety of the ingredient",
            },
            {
                "name": "name of the ingredient",
                "quantity": "quantity of the ingredient",
                "safetyLevel": "Healthy" | "Unhealthy" | "Very Unhealthy",
                "feedback": "a short feedback on the safety of the ingredient",
            },
            ...
            // generate as many entries as there are ingredients
        ]
        "result": {
            overAllSafety: "Healthy" | "Unhealthy" | "Very Unhealthy",
            healthyRate: number 1-100, // higher the better
            overAllFeedback: "a short feedback on the overall safety of the food product"
        }
    }
  `;

  const result = await model.generateContent(prompt);
  let jsonres = result.response.text().trim();
  if (jsonres.startsWith("```json")) {
    jsonres = jsonres.replace("```json", "");
  }
  if (jsonres.endsWith("```")) {
    jsonres = jsonres.replace("```", "");
  }
  return JSON.parse(jsonres);
};
