import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(">>>>>  Új kérés:", request.nextUrl.pathname);
  return NextResponse.next();
}
