# Food Pharmer API Documentation

Backend service for food label analysis using Node.js and PostgreSQL.

## API Endpoints

### Reports

#### Create New Report
- **URL**: `/report/new`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `reportImg`: Image file of the nutrition label
- **Success Response**: 
  - Status: 200
  - Content: `{ "message": "Report created" }`
- **Error Response**:
  - Status: 400/500
  - Content: `{ "message": "error message" }`

#### Fetch All Reports
- **URL**: `/report/fetch-all-reports`
- **Method**: `POST`
- **Success Response**:
  - Status: 200
  - Content: Array of report objects:
    ```json
    [{
      "id": number,
      "upload_time": string,
      "image": string,
      "ocr_text": string,
      "analysis": {
        "summary": string,
        "ingredientsAnalysis": array,
        "result": object
      }
    }]
    ```
- **Error Response**:
  - Status: 500
  - Content: `{ "message": "error message" }`

## Json Format

```json
{
    "summary": "Moderately high in fat and sugar; low in protein and fiber.  Overall nutritional value is questionable.",
    "ingredientsAnalysis": [
        {
            "name": "Total Fat",
            "quantity": "8g",
            "safetyLevel": "Unhealthy",
            "feedback": "High in total fat, exceeding recommended daily intake for a single serving."
        },
        {
            "name": "Saturated Fat",
            "quantity": "2.5g",
            "safetyLevel": "Unhealthy",
            "feedback": "Relatively high saturated fat content; contributes to unhealthy cholesterol levels."
        },
        {
            "name": "Trans Fat",
            "quantity": "0g",
            "safetyLevel": "Healthy",
            "feedback": "No trans fat, which is positive."
        },
        {
            "name": "Cholesterol",
            "quantity": "0mg",
            "safetyLevel": "Healthy",
            "feedback": "Cholesterol is 0mg, which is good."
        },
        {
            "name": "Sodium",
            "quantity": "50mg",
            "safetyLevel": "Healthy",
            "feedback": "Sodium content is relatively low."
        },
        {
            "name": "Total Carbohydrate",
            "quantity": "37g",
            "safetyLevel": "Unhealthy",
            "feedback": "High carbohydrate content; needs further investigation into types of carbohydrates (sugars vs. fiber)."
        },
        {
            "name": "Dietary Fiber",
            "quantity": "3g",
            "safetyLevel": "Healthy",
            "feedback": "Low fiber content; could be improved."
        },
        {
            "name": "Sugars",
            "quantity": "13g",
            "safetyLevel": "Unhealthy",
            "feedback": "High sugar content; contributes to potential health risks."
        },
        {
            "name": "Protein",
            "quantity": "4g",
            "safetyLevel": "Unhealthy",
            "feedback": "Low protein content; insufficient for a balanced meal."
        },
        {
            "name": "Vitamin A",
            "quantity": "0-4%",
            "safetyLevel": "Neutral",
            "feedback": "Variable Vitamin A content; needs clarification."
        },
        {
            "name": "Vitamin C",
            "quantity": "0%",
            "safetyLevel": "Unhealthy",
            "feedback": "Lack of Vitamin C."
        },
        {
            "name": "Calcium",
            "quantity": "2-15%",
            "safetyLevel": "Neutral",
            "feedback": "Variable Calcium content; needs clarification."
        },
        {
            "name": "Iron",
            "quantity": "6%",
            "safetyLevel": "Healthy",
            "feedback": "Iron content is adequate."
        }
    ],
    "result": {
        "overAllSafety": "Unhealthy",
        "healthyRate": 40,
        "overAllFeedback": "This food item has a concerningly high fat and sugar content, low protein and fiber, and some missing or unclear nutritional information.  It's recommended to choose healthier alternatives."
    }
}
```


## Environment Setup
Required environment variables:
```bash
PORT=9876
HOST_URL=http://localhost:9876/
DB_HOST=***
DB_PORT=5432
DB_USER=***
DB_PASSWORD=***
DB_DATABASE_NAME=***
GOOGLE_AI_STUDIO_KEY=***
