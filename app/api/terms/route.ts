import { NextResponse } from "next/server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/app/db/db";
import { user, terms } from "@/app/db/schema";
import { eq, lte, and } from "drizzle-orm";
import { TermItem} from "@/app/map/constants";

export async function GET(request: Request, context: any) {
  try {
    const loggedInUser = await validateRequest();
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get info from loggedUser ...
    const language = "Farsi"
    const branch_no = 1
    const checkpoint_no = 1

    // get terms from database
    const result = await db
    .select({
      term: terms.term,
      def: terms.definition,
      img: terms.image,
      translations: terms.translations,
      branch_no: terms.branch_no,
      checkpoint_no: terms.checkpoint_no,
      classes: terms.classes
    })
    .from(terms)
    .limit(5)
    .where(
      and(
        lte(terms.branch_no, branch_no),
        lte(terms.checkpoint_no, checkpoint_no)
      )
    ) 

    const termItems: TermItem[] = result.map((term) => ({
      term: term.term,
      definition: term.def,
      // definition: JSON.parse(term.translations as string)[language],
      image: {
        title: "temporary_image",  // to be update when images are implemented
        url: "/temp.jpg" // to be update when images are implemented
      },
      example: "N/A"
    }))

    return NextResponse.json({ payload: termItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}