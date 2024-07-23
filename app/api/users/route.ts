import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

export async function GET(request: Request) {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.execute(
      "select * from User"
    );
    db.release();

    return NextResponse.json({ payload: rows }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}