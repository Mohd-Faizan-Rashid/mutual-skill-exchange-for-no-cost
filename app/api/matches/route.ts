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
      error: userErr,
    } = await supabase.auth.getUser()
    if (userErr || !user) return NextResponse.json([], { status: 200 })

    const { data: matches, error } = await supabase
      .from("matches")
      .select("id,teacher_id,learner_id,status,skill_id,updated_at,created_at")
      .or(`teacher_id.eq.${user.id},learner_id.eq.${user.id}`)
      .order("updated_at", { ascending: false })
      .limit(100)
    if (error) throw error

    const counterpartIds = matches.map((m) => (m.teacher_id === user.id ? m.learner_id : m.teacher_id))
    const uniqueIds = Array.from(new Set(counterpartIds))
    const { data: profiles } =
      uniqueIds.length > 0
        ? await supabase.from("profiles").select("id,display_name,avatar_url,location").in("id", uniqueIds)
        : { data: [] as any }

    const profMap = new Map((profiles || []).map((p: any) => [p.id, p]))
    const payload = matches.map((m) => {
      const otherId = m.teacher_id === user.id ? m.learner_id : m.teacher_id
      return {
        id: m.id,
        status: m.status,
        counterpart: profMap.get(otherId) || null,
        skill_id: m.skill_id,
        updated_at: m.updated_at,
        created_at: m.created_at,
      }
    })
    return NextResponse.json(payload)
  } catch (e: any) {
    console.log("[v0] /api/matches error:", e?.message || e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
