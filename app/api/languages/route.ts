import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { languages } from "@/app/db/schema";

export async function GET() {
  try {
    // Fetch all languages from the `languages` table
    const allLanguages = await db.select().from(languages);

    // Return the languages as a JSON response
    return NextResponse.json({ success: true, data: allLanguages });
  } catch (error) {
    console.error("Error fetching languages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch languages" },
      { status: 500 }
    );
  }
}
