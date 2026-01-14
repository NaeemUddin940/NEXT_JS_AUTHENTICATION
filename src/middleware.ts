// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // ১. ইউজারের রোল চেক করুন (বাস্তবে এটি Cookie বা JWT থেকে আসবে)
  const role = "user";
  const { pathname } = request.nextUrl;

  // ২. যদি ইউজার এডমিন না হয় এবং সে /admin দিয়ে শুরু হওয়া কোনো পেজে যেতে চায়
  if (pathname.startsWith("/admin") && role !== "admin") {
    // তাকে অন্য পেজে পাঠিয়ে দিন
    return NextResponse.redirect(new URL("/user/profile", request.url));
  }

  return NextResponse.next();
}

// ৩. কোন কোন পাথে এই মিডলওয়্যারটি কাজ করবে তা কনফিগার করুন
export const config = {
  matcher: ["/admin/:path*"], // শুধু এডমিন এর সব পেজ চেক করবে
};
