const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

const schemaPath = path.join(__dirname, "../packages/shared/db/schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "mind",
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log("Connected to database");

    await client.query(schema);
    console.log("Database schema initialized successfully");
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupDatabase();
