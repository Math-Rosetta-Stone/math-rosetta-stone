import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { user } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";
import { permission } from "@/app/db/schema";

// Get logged in user's permission for a specific branch
export async function GET(request: Request, context: any) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;
    const branch_no = parseInt(params.branch_no, 10);

    // Find permission for the logged in user with the specified branch_no
    const permissionData = await db.query.permission.findFirst({
      where: and(
        eq(permission.user_id, loggedInUser.user.id),
        eq(permission.curr_branch_no, branch_no)
      ),
    });

    if (!permissionData) {
      return NextResponse.json(
        { error: "No permission found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ payload: permissionData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Updated the permission data for the logged in user
export async function PUT(request: Request, context: any) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;
    const branch_no = parseInt(params.branch_no, 10);

    const { updatedChapterNo, updatedLevelNo } = await request.json();

    if (!updatedChapterNo || !updatedLevelNo) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Update the permission data for the logged in user
    const updatedPermission = await db
      .update(permission)
      .set({
        curr_chapter_no: updatedChapterNo,
        curr_level_no: updatedLevelNo,
      })
      .where(
        and(
          eq(permission.user_id, loggedInUser.user.id),
          eq(permission.curr_branch_no, branch_no)
        )
      );

    return NextResponse.json({ payload: updatedPermission }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Insert a new permission data for the logged in user given a branch_no
export async function POST(request: Request, context: any) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;
    const branch_no = parseInt(params.branch_no, 10);

    // Insert a new permission data for the logged in user
    const newPermission = await db.insert(permission).values({
      user_id: loggedInUser.user.id,
      curr_branch_no: branch_no,
      curr_chapter_no: 1,
      curr_level_no: 1,
    });

    return NextResponse.json({ payload: newPermission }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
