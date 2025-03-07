import { NextResponse } from "next/server"

import { validateRequest } from "@/lib/auth"
import { db } from "@/app/db/db"
import { permission } from "@/app/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const loggedInUser = await validateRequest()
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch all permissions for the logged-in user
    const permissionData = await db.query.permission.findMany({
      where: eq(permission.user_id, loggedInUser.user.id),
    })

    if (!permissionData || permissionData.length === 0) {
      return NextResponse.json({ error: "No permissions found" }, { status: 404 })
    }

    return NextResponse.json({ payload: permissionData }, { status: 200 })
  } catch (error) {
    console.error("Error fetching permissions:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
