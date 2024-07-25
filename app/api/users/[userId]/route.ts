import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

import { omitPassword } from "@/lib/utils";

// Get user by ID
export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const db = await pool.getConnection();
    const [rows] = await db.execute(
      "SELECT * FROM User WHERE id = ?",
      [params.userId]
    );
    db.release();

    if (rows.length <= 0) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ payload: omitPassword(rows)[0] }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}