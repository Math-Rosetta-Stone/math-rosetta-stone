import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { branch } from "@/app/db/schema";
import { eq } from "drizzle-orm";

// Get branch data for branch with branch_no
export async function GET(request: Request, context: any) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;

    const branchData = await db.query.branch.findFirst({
      where: eq(branch.branch_no, params.branchNo),
    });

    return NextResponse.json({ payload: branchData }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}