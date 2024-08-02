import {
  datetime,
  foreignKey,
  int,
  mysqlTable,
  primaryKey,
  unique,
  varchar
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  username: varchar("username", { length: 50 }).$type<string>().unique().notNull(),
  password_hash: varchar("password_hash", { length: 100 }).notNull(),
  curr_branch_no: int("curr_branch_no").default(1),
  curr_chapter_no: int("curr_chapter_no").default(1),
  curr_level_no: int("curr_level_no").default(1),
});

export const session = mysqlTable("session", {
	id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id),
	expiresAt: datetime("expires_at").notNull()
});

export const branch = mysqlTable("branch", {
  branch_no: int("branch_no").primaryKey(),
  no_of_chapters: int("no_of_chapters").notNull(),
  map_name: varchar("map_name", { length: 100 }).notNull(),
});

export const chapter = mysqlTable("chapter", {
  chapter_no: int("chapter_no").primaryKey(),
  branch_no: int("branch_no").references(() => branch.branch_no),
  no_of_minigames: int("no_of_minigames").notNull(),
}, (table) => {
  return {
    primaryKey: primaryKey({
      columns: [table.chapter_no, table.branch_no],
    }),
  };
});

export const level = mysqlTable("level", {
  level_no: int("level_no"),
  chapter_no: int("chapter_no"),
  branch_no: int("branch_no"),
  minigame_name: varchar("minigame_name",
    { length: 8,
      enum: [
        "hangman",
        "matching",
        "mcq",
        "logo",
        "fib",
        "listen",
        "random",
      ]
    }
  ).notNull(),
  x: int("x").notNull(),
  y: int("y").notNull(),
}, (table) => {
  return {
    primaryKey: primaryKey({
      columns: [table.level_no, table.chapter_no, table.branch_no]
    }),
    foreignKey: foreignKey({
      columns: [table.chapter_no, table.branch_no],
      foreignColumns: [chapter.chapter_no, chapter.branch_no],
    }),
    unique: unique().on(table.chapter_no, table.branch_no, table.x, table.y),
  };
});