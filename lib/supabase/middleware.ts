import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(
  request: NextRequest,
): Promise<NextResponse | { response: NextResponse; user: any }> {
  let supabaseResponse = NextResponse.next({ request })

  let user: any = null
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      // If envs are missing, skip Supabase lookups but allow the app to render
      return { response: supabaseResponse, user: null }
    }

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    const { data, error } = await supabase.auth.getUser()
    if (error) {
      // swallow auth fetch errors — do not break SSR
      // console.log("[v0] supabase auth getUser error in middleware:", error.message)
    } else {
      user = data.user
    }

    // Protect app routes (best-effort)
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/messages") ||
      request.nextUrl.pathname.startsWith("/matches")
    ) {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = "/auth/login"
        return NextResponse.redirect(url)
      }
    }

    return { response: supabaseResponse, user }
  } catch {
    // Any unexpected failure — allow the request to continue without user context
    return { response: supabaseResponse, user: null }
  }
}
