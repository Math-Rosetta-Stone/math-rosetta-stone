import { defineConfig } from "drizzle-kit";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env.local" });

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "default",
  },
});