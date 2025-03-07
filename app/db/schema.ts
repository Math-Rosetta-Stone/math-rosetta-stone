import {
  boolean,
  datetime,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  unique,
  varchar,
  foreignKey,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

// First, define tables without foreign keys
export const user = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    username: varchar("username", { length: 50 })
      .$type<string>()
      .unique()
      .notNull(),
    password_hash: varchar("password_hash", { length: 100 }).notNull(),
    is_admin: boolean("is_admin").default(false).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  users => {
    return {
      usernameIdx: uniqueIndex("username_idx").on(users.username),
    };
  }
);

export const branch = mysqlTable(
  "branch",
  {
    branch_no: int("branch_no").primaryKey(),
    no_of_chapters: int("no_of_chapters").notNull(),
    map_name: varchar("map_name", { length: 100 }).notNull(),
  },
  table => {
    return {
      primaryKey: primaryKey({ columns: [table.branch_no] }),
    };
  }
);

// Now define tables with foreign keys
export const chapter = mysqlTable(
  "chapter",
  {
    chapter_no: int("chapter_no").notNull(),
    branch_no: int("branch_no")
      .references(() => branch.branch_no)
      .notNull(),
    no_of_minigames: int("no_of_minigames").notNull(),
  },
  table => {
    return {
      primaryKey: primaryKey({
        columns: [table.chapter_no, table.branch_no],
      }),
    };
  }
);

export const level = mysqlTable(
  "level",
  {
    level_no: int("level_no").notNull(),
    chapter_no: int("chapter_no").notNull(),
    branch_no: int("branch_no").notNull(),
    minigame_name: varchar("minigame_name", {
      length: 8,
      enum: ["hangman", "matching", "mcq", "logo", "fib", "listen", "random"],
    }).notNull(),
    x: int("x").notNull(),
    y: int("y").notNull(),
  },
  table => {
    return {
      primaryKey: primaryKey({
        columns: [table.branch_no, table.chapter_no, table.level_no],
      }),
      foreignKey: foreignKey({
        name: "level_chapter_fk",
        columns: [table.chapter_no, table.branch_no],
        foreignColumns: [chapter.chapter_no, chapter.branch_no],
      }),
      unique: unique().on(table.chapter_no, table.branch_no, table.x, table.y),
    };
  }
);

export const session = mysqlTable(
  "session",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id),
    expiresAt: datetime("expires_at").notNull(),
  },
  table => {
    return {
      primaryKey: primaryKey({ columns: [table.id] }),
      userFk: foreignKey({
        name: "session_user_fk",
        columns: [table.userId],
        foreignColumns: [user.id],
      }),
    };
  }
);

export const permission = mysqlTable(
  "permission",
  {
    user_id: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id),
    curr_branch_no: int("curr_branch_no").notNull(),
    curr_chapter_no: int("curr_chapter_no").notNull(),
    curr_level_no: int("curr_level_no").notNull(),
  },
  table => {
    return {
      primaryKey: primaryKey({
        columns: [table.user_id, table.curr_branch_no],
      }),
      foreignKey: foreignKey({
        name: "permission_level_fk",
        columns: [
          table.curr_branch_no,
          table.curr_chapter_no,
          table.curr_level_no,
        ],
        foreignColumns: [level.branch_no, level.chapter_no, level.level_no],
      }),
    };
  }
);

// Add type exports at the end
export type SelectBranch = typeof branch.$inferSelect;
export type InsertBranch = typeof branch.$inferInsert;

export type SelectChapter = typeof chapter.$inferSelect;
export type InsertChapter = typeof chapter.$inferInsert;

export type SelectLevel = typeof level.$inferSelect;
export type InsertLevel = typeof level.$inferInsert;

export type SelectUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;

export type SelectSession = typeof session.$inferSelect;
export type InsertSession = typeof session.$inferInsert;

export type SelectPermission = typeof permission.$inferSelect;
export type InsertPermission = typeof permission.$inferInsert;
