"use server";

import { db } from "../db/db";
import { permission } from "../db/schema";
import { eq } from "drizzle-orm";
import { ActionResult } from "@/lib/form";

export async function revertUserPermissions(
  userId: string
): Promise<ActionResult> {
  try {
    // First delete all existing permissions for the user
    await db.delete(permission).where(eq(permission.user_id, userId));

    // Then insert initial permissions for all 7 branches
    await db.insert(permission).values(
      Array.from({ length: 7 }, (_, i) => ({
        user_id: userId,
        curr_branch_no: i + 1,
        curr_chapter_no: 1,
        curr_level_no: 1,
      }))
    );

    return { error: null };
  } catch (error) {
    console.error("Failed to revert permissions:", error);
    return { error: "Failed to revert permissions" };
  }
}
