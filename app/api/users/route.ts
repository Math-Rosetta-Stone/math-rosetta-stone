import { NextResponse } from "next/server";
import pool from "@/lib/mysql";
import argon2 from "argon2";

import { omitPassword } from "@/lib/utils";

// Get all users
export async function GET(request: Request) {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.execute(
      "SELECT * FROM User"
    );
    db.release();

    console.log("ROWS:", rows);

    return NextResponse.json({ payload: omitPassword(rows) }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Register user
export async function POST(request: Request) {
  try {
    const { userName, password } = await request.json();
    if (!userName || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const db = await pool.getConnection();

    // Ensure username doesn't already exist
    const [existingRows] = await db.execute(
      "SELECT * FROM User WHERE username COLLATE utf8mb4_bin LIKE ?",
      [userName]
    );
    console.log("EXISTING ROWS:", existingRows);

    if (existingRows.length > 0) {
      return NextResponse.json({ message: "Username taken" }, { status: 400 });
    }

    // Register user
    const hashedPassword = await argon2.hash(password);
    console.log();

    await db.execute(
      "INSERT INTO User (username, password) \
      VALUES (?, ?)",
      [userName, hashedPassword]
    );

    // Verify registration was successful
    const [rows] = await db.execute(
      "SELECT * FROM User WHERE username COLLATE utf8mb4_bin LIKE ?",
      [userName]
    );

    db.release();

    if (rows.length <= 0) {
      return NextResponse.json({ message: "Registration failed" }, { status: 500 });
    } else if (rows[0].username === userName) {
      return NextResponse.json({ message: "Registration successful" }, { status: 201 });
    }

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}