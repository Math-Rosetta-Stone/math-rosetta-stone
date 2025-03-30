import { db } from "@/app/db/db";
import { terms } from "@/app/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch all terms from the `terms` table
    const allTerms = await db.select().from(terms);

    // Return the terms as a JSON response
    return NextResponse.json({ success: true, data: allTerms });
  } catch (error) {
    console.error("Error fetching terms:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch terms" },
      { status: 500 }
    );
  }
}
