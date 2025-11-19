import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const result = await updateSession(request)

  // If updateSession returned a redirect/NextResponse directly, pass it through
  if (result instanceof NextResponse) {
    return result
  }

  const { response, user } = result

  // Redirect new users to onboarding after email confirmation — best-effort
  if (user && request.nextUrl.pathname === "/dashboard") {
    const hasCompletedOnboarding = request.cookies.get("onboarding_completed")
    if (!hasCompletedOnboarding) {
      const url = request.nextUrl.clone()
      url.pathname = "/onboarding"
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
