import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // jwt 방식일경우에만 유저정보를 getToken 으로 유저정보 확인 가능

  const session = await getToken({ req: request });
  if (request.nextUrl.pathname.startsWith("/list")) {
    console.log(new Date());
    return NextResponse.next();
  }

  // 유저정보가없을경우에는 글쓰기 기능 막아주기
  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      return NextResponse.redirect(new URL("/api/auth/signin"), request.url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/register")) {
    const newCookie = NextResponse.next();
    if (request.cookies.has("visited")) {
      return NextResponse.next();
    } else {
      newCookie.cookies.set({
        name: "visited",
        value: true,
      });
      return newCookie;
    }
  }
}
