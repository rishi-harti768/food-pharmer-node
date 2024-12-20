import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
});

pool.on("error", (err) => console.log("database error: " + err));

export const initDB = async () => {
  const reports = `
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      product_name varchar(255) NOT NULL,
      upload_time varchar(255) NOT NULL,
      image varchar(255) NOT NULL,
      image_quality varchar(255) NOT NULL,
      ocr_text varchar(255) NOT NULL,
      analysis json NOT NULL
    );`;
  try {
    await pool.query(reports);
    console.log("tables created");
  } catch (err) {
    console.log(err);
  }
};

export default pool;
