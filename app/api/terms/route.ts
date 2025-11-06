import { db } from "@/app/db/db";
import { validateRequest } from "@/lib/auth";
import { sql } from "drizzle-orm/sql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const branch = Number(request.nextUrl.searchParams.get("branch"));
    const chapter = Number(request.nextUrl.searchParams.get("chapter"));
    const level = Number(request.nextUrl.searchParams.get("level"));
    if (!branch || !chapter || !level) {
      return NextResponse.json({ error: "Missing/invalid fields" }, { status: 400 });
    }
    
    const termsRangeStart = (chapter - 1) * 6 + 1;

    const [results] = await db.execute(
      sql`
        WITH ranked AS (
          SELECT 
            t.*,
            ROW_NUMBER() OVER (ORDER BY \`rank\`, term_id) AS rn
          FROM rsgame.terms t
          WHERE t.branch_no = ${branch}
        )
        SELECT * FROM ranked
        WHERE rn BETWEEN ${termsRangeStart} AND ${termsRangeStart + 5}
        ORDER BY rn
      `
    );

    return NextResponse.json({ data: results });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
