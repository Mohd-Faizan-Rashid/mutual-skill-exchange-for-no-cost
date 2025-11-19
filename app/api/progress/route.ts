import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

function getServer() {
  const c = cookies()
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return c.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        c.set(name, value, options)
      },
      remove(name: string, options: any) {
        c.set(name, "", { ...options, maxAge: 0 })
      },
    },
  })
}

export async function GET() {
  try {
    const supabase = getServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ sessions: [], achievements: [] })

    const { data: sessions } = await supabase
      .from("sessions")
      .select("id,match_id,scheduled_at,duration_minutes,status,rating,created_at,notes")
      .order("scheduled_at", { ascending: false })
      .limit(200)

    const { data: achievements } = await supabase
      .from("achievements")
      .select("id,title,description,badge_type,earned_at")
      .eq("user_id", user.id)
      .order("earned_at", { ascending: false })
      .limit(100)

    return NextResponse.json({ sessions: sessions || [], achievements: achievements || [] })
  } catch (e) {
    console.log("[v0] /api/progress error:", (e as any)?.message || e)
    return NextResponse.json({ sessions: [], achievements: [] })
  }
}
