import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log("running");

  const user = "fdsafds";
  if (!user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/game"]
};