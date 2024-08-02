import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { user } from "@/app/db/schema";
import { eq } from "drizzle-orm";

// Get logged in user's data
export async function GET() {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, password_hash, ...rest } = await db.query.user.findFirst({
      where: eq(user.id, loggedInUser.user.id),
    });

    return NextResponse.json({ payload: rest }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}