import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { level } from "@/app/db/schema";
import { and, eq, asc } from "drizzle-orm";

// Get all levels
export async function GET() {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const levelData = await db.query.level.findMany({
      orderBy: (level, { asc }) => [
        asc(level.branch_no),
        asc(level.chapter_no),
        asc(level.level_no),
      ],
    });

    return NextResponse.json({ payload: levelData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Get level data for levels with given branch_no, chapter_no,
export async function POST(request: Request) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { branchNo, chapterNo } = await request.json();
    if (!branchNo || !chapterNo) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // const branchNo = searchParams.get("branch_no") ?? ""
    // const chapterNo = searchParams.get("chapter_no") ?? ""
    // // const levelNo = searchParams.get("level_no")  ?? "";

    const levelData = await db.query.level.findMany({
      where: (level, { and, eq }) =>
        and(
          eq(level.branch_no, parseInt(branchNo, 10)),
          eq(level.chapter_no, parseInt(chapterNo, 10))
          // eq(level.level_no, parseInt(levelNo, 10)),
        ),
    });

    return NextResponse.json({ payload: levelData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
