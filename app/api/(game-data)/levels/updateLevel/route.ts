import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { level } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";

interface UpdateLevelLocationRequest {
  level_no: number;
  branch_no: number;
  chapter_no: number;
  x: number;
  y: number;
}

export async function POST(request: Request) {
  try {
    // Validate admin user
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body: UpdateLevelLocationRequest = await request.json();
    const { level_no, branch_no, chapter_no, x, y } = body;

    // Validate required fields
    if (
      !level_no ||
      !branch_no ||
      !chapter_no ||
      x === undefined ||
      y === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update level location
    await db
      .update(level)
      .set({
        x: x,
        y: y,
      })
      .where(
        and(
          eq(level.level_no, level_no),
          eq(level.branch_no, branch_no),
          eq(level.chapter_no, chapter_no)
        )
      );

    return NextResponse.json(
      { message: "Level location updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating level location:", error);
    return NextResponse.json(
      { error: "Failed to update level location" },
      { status: 500 }
    );
  }
}
