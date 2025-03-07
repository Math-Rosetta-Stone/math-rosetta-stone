import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { level, user } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";
import { SelectLevel } from "@/app/db/schema";

export async function POST(request: Request) {
  try {
    // Validate authentication
    const auth = await validateRequest();
    if (!auth || !auth.user || !auth.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin status by fetching user from database
    const dbUser = await db.query.user.findFirst({
      where: eq(user.id, auth.user.id),
    });

    if (!dbUser || !dbUser.is_admin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Parse request body - array of levels
    const levels: SelectLevel[] = await request.json();

    if (!Array.isArray(levels) || levels.length === 0) {
      return NextResponse.json(
        { error: "Invalid levels data" },
        { status: 400 }
      );
    }

    // Process each level and update
    const updatePromises = levels.map(levelData => {
      return db
        .update(level)
        .set({
          x: levelData.x,
          y: levelData.y,
          minigame_name: levelData.minigame_name,
        })
        .where(
          and(
            eq(level.level_no, levelData.level_no),
            eq(level.branch_no, levelData.branch_no),
            eq(level.chapter_no, levelData.chapter_no)
          )
        );
    });

    // Execute all updates
    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: "Levels updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating levels:", error);
    return NextResponse.json(
      { error: "Failed to update levels" },
      { status: 500 }
    );
  }
}
