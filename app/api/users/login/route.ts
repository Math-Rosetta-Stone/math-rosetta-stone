import { NextResponse } from "next/server";
import pool from "@/lib/mysql";
import argon2 from "argon2";

import { omitPassword } from "@/lib/utils";

// Login user
export async function POST(request: Request) {
  try {
    const { userName, password } = await request.json();
    if (!userName || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const db = await pool.getConnection();
    const [rows] = await db.execute(
      "SELECT * FROM User WHERE username COLLATE utf8mb4_bin LIKE ?",
      [userName]
    );
    db.release();

    if (rows.length <= 0) return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (await argon2.verify(rows[0].password, password)) {
      return NextResponse.json({
          message: `Logged in as ${rows[0].username}`,
          payload: omitPassword(rows)[0]
        }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Incorrect username or password" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}