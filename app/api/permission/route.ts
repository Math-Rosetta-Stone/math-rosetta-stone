import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { permission } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      console.log("GET /api/permission - Unauthorized user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(
      "GET /api/permission - Fetching permissions for user:",
      loggedInUser.user.id
    );

    // Fetch all permissions for the logged-in user
    const permissionData = await db.query.permission.findMany({
      where: eq(permission.user_id, loggedInUser.user.id),
    });

    console.log("GET /api/permission - Raw permission data:", permissionData);

    if (!permissionData || permissionData.length === 0) {
      console.log("GET /api/permission - No permissions found for user");
      // Return an empty array instead of 404 to be more consistent
      return NextResponse.json({ payload: [] }, { status: 200 });
    }

    return NextResponse.json({ payload: permissionData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Update user permission
export async function POST(request: Request) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      console.log("POST /api/permission - Unauthorized user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newPermission } = await request.json();
    console.log(
      "POST /api/permission - Received new permission data:",
      newPermission
    );

    if (!newPermission || typeof newPermission.branch_no !== "number") {
      console.log("POST /api/permission - Missing or invalid permission data");
      return NextResponse.json(
        { error: "Missing or invalid permission data" },
        { status: 400 }
      );
    }

    // Check if permission exists for this branch
    const existingPermission = await db.query.permission.findFirst({
      where: and(
        eq(permission.user_id, loggedInUser.user.id),
        eq(permission.curr_branch_no, newPermission.branch_no)
      ),
    });

    console.log(
      "POST /api/permission - Existing permission:",
      existingPermission
    );

    if (existingPermission) {
      // Update existing permission
      await db
        .update(permission)
        .set({
          curr_chapter_no: newPermission.chapter_no,
          curr_level_no: newPermission.level_no,
        })
        .where(
          and(
            eq(permission.user_id, loggedInUser.user.id),
            eq(permission.curr_branch_no, newPermission.branch_no)
          )
        );

      console.log("Updated permission for branch:", newPermission.branch_no);
    } else {
      // Insert new permission
      await db.insert(permission).values({
        user_id: loggedInUser.user.id,
        curr_branch_no: newPermission.branch_no,
        curr_chapter_no: newPermission.chapter_no,
        curr_level_no: newPermission.level_no,
      });

      console.log(
        "Inserted new permission for branch:",
        newPermission.branch_no
      );
    }

    // Fetch all updated permissions for the user
    const updatedPermissions = await db.query.permission.findMany({
      where: eq(permission.user_id, loggedInUser.user.id),
    });

    console.log(
      "POST /api/permission - Updated permissions:",
      updatedPermissions
    );

    return NextResponse.json(
      {
        message: existingPermission
          ? "Permission updated"
          : "Permission created",
        payload: updatedPermissions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating permission:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
