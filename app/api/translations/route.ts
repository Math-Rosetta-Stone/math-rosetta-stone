import { db } from "@/app/db/db";
import { translations, terms, languages } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the language name from query parameters
    const languageName = request.nextUrl.searchParams.get("language");

    if (!languageName) {
      return NextResponse.json(
        { success: false, error: "Language parameter is required" },
        { status: 400 }
      );
    }

    // Fetch the language ID for the given language name
    const language = await db
      .select()
      .from(languages)
      .where(eq(languages.name, languageName))
      .limit(1);

    if (!language.length) {
      return NextResponse.json(
        { success: false, error: "Language not found" },
        { status: 404 }
      );
    }

    const languageId = language[0].lang_id;

    // Fetch translations for the given language
    const translationsData = await db
      .select({
        term: terms.term,
        translation: translations.definition,
      })
      .from(translations)
      .innerJoin(terms, eq(translations.term_id, terms.term_id))
      .where(eq(translations.lang_id, languageId));

    // Return the translations as a JSON response
    return NextResponse.json({ success: true, data: translationsData });
  } catch (error) {
    console.error("Error fetching translations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch translations" },
      { status: 500 }
    );
  }
}
//
