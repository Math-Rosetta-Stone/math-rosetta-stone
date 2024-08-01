import { NextResponse } from "next/server";

import { db } from "@/app/db/db";
import { user } from "@/app/db/schema";
import { eq } from "drizzle-orm";

import argon2 from "argon2";
import { omitPassword } from "@/lib/utils";

// Get all users
export async function GET(request: Request) {
  try {
    const usersFound = await db.select().from(user);

    return NextResponse.json({ payload: omitPassword(usersFound) }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Register user
export async function POST(request: Request) {
  try {
    const { userName, password } = await request.json();
    if (!userName || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Ensure username doesn't already exist
    const existingUser = await db.select().from(user).where(eq(user.username, userName));

    if (existingUser.length > 0) {
      return NextResponse.json({ message: "Username taken" }, { status: 400 });
    }

    // Register user
    const hashedPassword = await argon2.hash(password);
    await db.insert(user).values({ username: userName, password_hash: hashedPassword });

    // Verify registration was successful
    const insertedUser = await db.select().from(user).where(eq(user.username, userName));

    if (insertedUser.length <= 0) {
      return NextResponse.json({ message: "Registration failed" }, { status: 500 });
    } else if (insertedUser[0].username === userName) {
      return NextResponse.json({ message: "Registration successful" }, { status: 201 });
    }

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}