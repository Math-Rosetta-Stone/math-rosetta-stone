import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { level } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";
import { useSearchParams } from "next/navigation";

// Get level data for level with given branch_no, chapter_no, and level_no
export async function GET(request: Request) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = useSearchParams();
    const branchNo = searchParams.get("branch_no") ?? "";
    const chapterNo = searchParams.get("chapter_no")  ?? "";
    const levelNo = searchParams.get("level_no")  ?? "";

    const levelData = await db.query.level.findFirst({
      where: (level, { and, eq }) => and(
        eq(level.branch_no, parseInt(branchNo, 10)),
        eq(level.chapter_no, parseInt(chapterNo, 10)),
        eq(level.level_no, parseInt(levelNo, 10)),
      ),
    });

    return NextResponse.json({ payload: levelData }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}