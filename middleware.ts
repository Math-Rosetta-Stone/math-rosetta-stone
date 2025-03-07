import { NextResponse } from "next/server";

// TODO: Figure out a way to use validateRequest() here (fix react cache issue)
export function middleware(request: Request) {
  const user = "loggedIn";
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