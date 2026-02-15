import { auth } from "@/auth"

export const proxy = auth

export const config = {
  matcher: ["/repositories/:path*", "/workspace/:path*"],
}
