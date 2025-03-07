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

    const userData = await db.query.user.findFirst({
      where: eq(user.id, loggedInUser.user.id),
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password_hash, ...rest } = userData;

    return NextResponse.json({ payload: rest }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// // Update user's branch_no, chapter_no, and level_no
// export async function POST(request: Request) {
//   try {
//     const loggedInUser = await validateRequest();
//     if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { branch_no, chapter_no, level_no } = await request.json();
//     if (!branch_no || !chapter_no || !level_no) {
//       return NextResponse.json({ message: "Missing fields" }, { status: 400 });
//     }

//     await db.update(user).set({
//       curr_branch_no: branch_no,
//       curr_chapter_no: chapter_no,
//       curr_level_no: level_no,
//     }).where(eq(user.id, loggedInUser.user.id));

//     // Verify update was successful
//     const updatedUser = await db.query.user.findFirst({
//       where: eq(user.id, loggedInUser.user.id),
//     });

//     if (updatedUser
//       && updatedUser.curr_branch_no === branch_no
//       && updatedUser.curr_chapter_no === chapter_no
//       && updatedUser.curr_level_no === level_no) {
//       return NextResponse.json({ message: "Update successful" }, { status: 200 });
//     } else {
//       return NextResponse.json({ message: "Update failed" }, { status: 500 });
//     }

//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }
