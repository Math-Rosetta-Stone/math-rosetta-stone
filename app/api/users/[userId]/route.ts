import { NextResponse } from "next/server";

import { db } from "@/app/db/db";
import { user } from "@/app/db/schema";
import { eq } from "drizzle-orm";

import { omitPassword } from "@/lib/utils";

// Get user by ID
export async function GET(request: Request, context: any) {
  try {
    const { params } = context;

    const userFound = await db.select().from(user).where(eq(user.id, params.userId));
    if (userFound.length <= 0) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ payload: omitPassword(userFound)[0] }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}