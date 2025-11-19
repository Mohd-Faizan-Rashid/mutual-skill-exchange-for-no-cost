import { type NextRequest, NextResponse } from "next/server"
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

export async function GET(req: NextRequest) {
  try {
    const supabase = getServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Fetch sessions where user is either teacher or learner (via matches)
    const { data: sessions, error } = await supabase
      .from("sessions")
      .select(`
        *,
        matches!inner (
          teacher_id,
          learner_id,
          skill_id,
          skills (name)
        )
      `)
      .order("scheduled_at", { ascending: true })

    if (error) throw error

    // Enrich with profile data manually or via another query if needed
    // For now, return the sessions
    return NextResponse.json(sessions)
  } catch (e: any) {
    console.log("[v0] /api/sessions error:", e?.message || e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
