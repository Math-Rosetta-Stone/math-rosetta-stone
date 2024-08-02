import {
  level,
  chapter,
  branch,
} from "./schema";

import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import { sql } from "drizzle-orm";

configDotenv({ path: ".env.local" });
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
});
const db = drizzle(connection, { schema, mode: "default" });

const seedData = async () => {
  try {
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);
    await db.delete(level);
    await db.delete(branch);
    await db.delete(chapter);
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);

    await db.insert(branch).values({
      branch_no: 1,
      no_of_chapters: 1,
      map_name: "default",
    });

    await db.insert(chapter).values({
      chapter_no: 1,
      branch_no: 1,
      no_of_minigames: 7,
    });

    await db.insert(level).values([
      {
        level_no: 1,
        chapter_no: 1,
        branch_no: 1,
        minigame_name: "hangman",
        x: 0,
        y: 0,
      },
      {
        level_no: 2,
        chapter_no: 1,
        branch_no: 1,
        minigame_name: "matching",
        x: 2,
        y: 2,
      },
      {
        level_no: 3,
        chapter_no: 1,
        branch_no: 1,
        minigame_name: "mcq",
        x: 3,
        y: 3,
      },
      {
        level_no: 4,
        chapter_no: 1,
        branch_no: 1,
        minigame_name: "logo",
        x: 4,
        y: 4,
      },
      {
        level_no: 5,
        chapter_no: 1,
        branch_no: 1,
        minigame_name: "fib",
        x: 5,
        y: 5,
      },
      {
        level_no: 6,
        chapter_no: 1,
        branch_no: 1,
        minigame_name: "listen",
        x: 6,
        y: 6,
      },
      {
        level_no: 7,
        chapter_no: 1,
        branch_no: 1,
        minigame_name: "random",
        x: 7,
        y: 7,
      },
    ]);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed data");
  } finally {
    await connection.end();
    process.exit(0);
  }
};

seedData();