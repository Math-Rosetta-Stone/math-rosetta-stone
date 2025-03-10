import { db } from "@/app/db/db";
import { validateRequest } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const branch = Number(request.nextUrl.searchParams.get("branch"));
    const level = Number(request.nextUrl.searchParams.get("level"));

    const unlockedTerms = await db.query.terms.findMany({
      where: (terms, { and, eq, lte }) => and(eq(terms.branch_no, branch), lte(terms.rank, level)),
    });

    return NextResponse.json({ data: unlockedTerms });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
