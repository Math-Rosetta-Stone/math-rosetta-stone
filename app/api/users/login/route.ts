import { NextResponse } from "next/server";

import { db } from "@/app/db/db";
import { user } from "@/app/db/schema";
import { eq } from "drizzle-orm";

import argon2 from "argon2";
import { omitPassword } from "@/lib/utils";

// Sign in user
export async function POST(request: Request) {
  try {
    const { userName, password } = await request.json();
    if (!userName || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Find user
    const userFound = await db.select().from(user).where(eq(user.username, userName));

    if (userFound.length <= 0) return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (await argon2.verify(userFound[0].password_hash, password)) {
      return NextResponse.json({
          message: `Logged in as ${userFound[0].username}`,
          payload: omitPassword(userFound)[0]
        }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Incorrect username or password" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}