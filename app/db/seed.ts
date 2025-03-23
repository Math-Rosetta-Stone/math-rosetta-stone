import { level, chapter, branch, user, InsertLevel } from "./schema";

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

const minigameNames = [
  "hangman",
  "matching",
  "mcq",
  "logo",
  "fib",
  "listen",
  "random",
];

const locationsBranch1 = [
  { x: 712, y: 79 },
  { x: 656, y: 229 },
  { x: 510, y: 166 },
  { x: 358, y: 114 },
  { x: 281, y: 277 },
  { x: 429, y: 366 },
  { x: 594, y: 355 },
];

const seedData = async () => {
  try {
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);
    await db.delete(level);
    await db.delete(branch);
    await db.delete(chapter);
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);

    await db.insert(branch).values({
      branch_no: 1,
      no_of_chapters: 7,
      map_name: "default",
    });

    await db.insert(chapter).values([
      {
        chapter_no: 1,
        branch_no: 1,
        no_of_minigames: 7,
      },
      {
        chapter_no: 2,
        branch_no: 1,
        no_of_minigames: 7,
      },
      {
        chapter_no: 3,
        branch_no: 1,
        no_of_minigames: 7,
      },
      {
        chapter_no: 4,
        branch_no: 1,
        no_of_minigames: 7,
      },
      {
        chapter_no: 5,
        branch_no: 1,
        no_of_minigames: 7,
      },
      {
        chapter_no: 6,
        branch_no: 1,
        no_of_minigames: 7,
      },
      {
        chapter_no: 7,
        branch_no: 1,
        no_of_minigames: 7,
      },
    ]);
    // await db.insert(level).values([
    //   {
    //     level_no: 1,
    //     chapter_no: 1,
    //     branch_no: 1,
    //     minigame_name: "hangman",
    //     x: 712,
    //     y: 79,
    //   },
    //   {
    //     level_no: 2,
    //     chapter_no: 1,
    //     branch_no: 1,
    //     minigame_name: "matching",
    //     x: 656,
    //     y: 229,
    //   },
    //   {
    //     level_no: 3,
    //     chapter_no: 1,
    //     branch_no: 1,
    //     minigame_name: "mcq",
    //     x: 510,
    //     y: 166,
    //   },
    //   {
    //     level_no: 4,
    //     chapter_no: 1,
    //     branch_no: 1,
    //     minigame_name: "logo",
    //     x: 358,
    //     y: 114,
    //   },
    //   {
    //     level_no: 5,
    //     chapter_no: 1,
    //     branch_no: 1,
    //     minigame_name: "fib",
    //     x: 281,
    //     y: 277,
    //   },
    //   {
    //     level_no: 6,
    //     chapter_no: 1,
    //     branch_no: 1,
    //     minigame_name: "listen",
    //     x: 429,
    //     y: 366,
    //   },
    //   {
    //     level_no: 7,
    //     chapter_no: 1,
    //     branch_no: 1,
    //     minigame_name: "random",
    //     x: 594,
    //     y: 355,
    //   },
    // ]);
    await insertLevels(1, 1);
    await insertLevels(1, 2);
    await insertLevels(1, 3);
    await insertLevels(1, 4);
    await insertLevels(1, 5);
    await insertLevels(1, 6);
    await insertLevels(1, 7);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed data");
  } finally {
    await connection.end();
    process.exit(0);
  }
};

seedData();

const insertLevels = async (branchNo: number, chapterNo: number) => {
  await db.insert(level).values(
    Array.from(
      { length: 7 },
      (_, i) =>
        ({
          level_no: i + 1,
          chapter_no: chapterNo,
          branch_no: branchNo,
          minigame_name: minigameNames[i],
          x: locationsBranch1[i].x,
          y: locationsBranch1[i].y,
        } as InsertLevel)
    )
  );
};
