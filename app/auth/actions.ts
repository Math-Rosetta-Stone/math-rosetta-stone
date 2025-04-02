"use server";

import { db } from "../db/db";
import { verify } from "argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { user, permission } from "../db/schema";
import { eq } from "drizzle-orm";
import { ActionResult } from "@/lib/form";
import { hash } from "argon2";

export async function signup(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  const password = formData.get("password");
  const isAdmin = formData.get("isAdmin") === "true";

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    typeof password !== "string" ||
    password.length < 6
  ) {
    throw new Error("Invalid credentials");
  }

  const hashedPassword = await hash(password);

  // TODO: check if username is already used
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.username, username));
  if (existingUser.length > 0) {
    return {
      error: "Username taken",
    };
  }

  const userId = crypto.randomUUID();
  await db.insert(user).values({
    id: userId,
    username,
    password_hash: hashedPassword,
    is_admin: isAdmin,
  });

  // // Insert initial permissions for all 7 branches
  // // We know that level 1,1,1 exists for each branch from the seed data
  // await db.insert(permission).values(
  //   Array.from({ length: 7 }, (_, i) => ({
  //     user_id: userId,
  //     curr_branch_no: i + 1,
  //     curr_chapter_no: 1,
  //     curr_level_no: 1,
  //   }))
  // );

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export async function signin(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await db.query.user.findFirst({
    where: eq(user.username, username.toLowerCase()),
  });
  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await verify(existingUser.password_hash, password);
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
