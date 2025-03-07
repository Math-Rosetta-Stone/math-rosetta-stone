import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function main() {
  // Create connection
  const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
  });

  // First, disable foreign key checks to avoid constraint issues
  console.log("Disabling foreign key checks...");
  await connection.query("SET FOREIGN_KEY_CHECKS=0;");

  // Drop all tables
  console.log("Dropping all tables...");
  const tables = [
    "permission",
    "session",
    "level",
    "chapter",
    "branch",
    "user",
  ];

  for (const table of tables) {
    try {
      console.log(`Dropping table ${table}...`);
      await connection.query(`DROP TABLE IF EXISTS ${table};`);
    } catch (error) {
      console.error(`Error dropping table ${table}:`, error);
    }
  }

  // Re-enable foreign key checks
  console.log("Re-enabling foreign key checks...");
  await connection.query("SET FOREIGN_KEY_CHECKS=1;");

  console.log(
    "All tables dropped successfully. You can now run 'npx drizzle-kit push:mysql' to recreate them."
  );

  // Close connection
  await connection.end();
}

main().catch(error => {
  console.error("Error:", error);
  process.exit(1);
});
