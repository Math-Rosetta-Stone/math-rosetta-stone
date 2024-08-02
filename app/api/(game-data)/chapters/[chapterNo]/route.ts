import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { chapter } from "@/app/db/schema";
import { eq } from "drizzle-orm";

// Get chapter data for chapter with chapter_no
export async function GET(request: Request, context: any) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;

    const chapterData = await db.query.chapter.findFirst({
      where: eq(chapter.chapter_no, params.chapterNo),
    });

    return NextResponse.json({ payload: chapterData }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}