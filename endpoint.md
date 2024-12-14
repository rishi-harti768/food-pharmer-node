## Create New Report

- **method:** POST
- **url:** `/report/new`
- **body:**

  ```json
  { "reportImg": "<image file>", "product_name": "<string>" }
  ```

- **response:**
  <br/>
  if no image file

  ```json
  // status: 400
  { "message": "No file provided" }
  ```

  if `product_name` is empty or null

  ```json
  // status: 400
  { "message": "Product name not provided" }
  ```

  if report success

  ```json
  // status: 200
  { "message": "Report created" }
  ```

  other server error

  ```json
  // status: 500
  { "message": "<error_message>" }
  ```

## fetch all reports

- **method:** POST
- **url:** `/report/fetch-all-reports`
- **body:**
  <br/>

  ```json
  {}
  ```

- **response:**
  <br/>

  ```json
  // status: 200
  [
    {
      "id": 1,
      "product_name": "xyz",
      "upload_time": "2024-12-14T12:05:41.000Z",
      "image_quality": "73",
      "image": "/reportImgs/1734155618648.jpg",
      "summary": "summary"
    },
    {
      "id": 2,
      "product_name": "abc",
      "upload_time": "2024-12-14T12:05:41.000Z",
      "image_quality": "70",
      "image": "/reportImgs/1734155810831.jpg",
      "summary": "summary"
    }
  ]
  ```

## fetch Individual report

- **method:** POST
- **url:** `/report/fetch-report`
- **body:**
  <br/>

  ```json
  { "id": 1 }
  ```

- **response:**
  <br/>

  ```json
  // status: 200
  {
    "id": 1,
    "product_name": "xyz",
    "upload_time": "2024-12-14T12:16:56.000Z",
    "image": "/reportImgs/1734155618648.jpg",
    "image_quality": "73",
    "ocr_text": "Nutrition Facts\nServing Size 2/3 cup (519)\nServings Per Container About 9\nTap\nAmount Per Sening__ url Simik\nCalories 240 280\nCalories from Fat 70 70\nTTT\nTotal Fat 80° 12% 12%\nSaturated Fat 2.59 13% 13%\nTrans Fat Og.\nCholesterol Omg 0% 0%\nSodium 50mg 2% 5%\nTotal\nCarbohydrate 37g 12% 14%\nDictary Fiber 3g 12% 12%\nSugars 13g.\nProtein 4g 8% 16%\nVitamin A 0% 4%\nVtamnC 0% 0%\nCacum 2% 15%\nIron 6% 6%\n",
    "analysis": {
      "summary": "Moderately high in fat and sugar; low in protein and fiber.  Overall nutritional value is questionable.",
      "ingredientsAnalysis": [
        {
          "name": "Total Fat",
          "quantity": "8g",
          "safetyLevel": "Unhealthy",
          "feedback": "High fat content, potentially contributing to weight gain and health issues if consumed regularly in large quantities."
        },
        {
          "name": "Saturated Fat",
          "quantity": "2.5g",
          "safetyLevel": "Unhealthy",
          "feedback": "Saturated fat should be limited as it can raise cholesterol levels."
        },
        {
          "name": "Cholesterol",
          "quantity": "0mg",
          "safetyLevel": "Healthy",
          "feedback": "Cholesterol level is good."
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
          "feedback": "High carbohydrate content; needs further analysis on type of carbs (simple vs complex)."
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
          "feedback": "High sugar content, contributing to potential health issues."
        },
        {
          "name": "Protein",
          "quantity": "4g",
          "safetyLevel": "Unhealthy",
          "feedback": "Low protein content; may not be sufficient for some individuals."
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
          "safetyLevel": "Neutral",
          "feedback": "No Vitamin C."
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
          "feedback": "Good iron content."
        }
      ],
      "result": {
        "overAllSafety": "Unhealthy",
        "healthyRate": 40,
        "overAllFeedback": "This food item has concerning levels of fat and sugar. While some nutrients are present, the overall nutritional profile is not ideal for regular consumption.  Consider choosing foods with lower fat, sugar, and higher fiber and protein."
      }
    }
  }
  ```
