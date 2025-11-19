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
    const { data: rows, error } = await supabase.from("achievements").select("user_id, id")
    if (error) throw error

    const counts: Record<string, number> = {}
    for (const r of rows || []) counts[r.user_id] = (counts[r.user_id] || 0) + 1

    const userIds = Object.keys(counts)
    const { data: profiles } =
      userIds.length > 0
        ? await supabase.from("profiles").select("id,display_name,avatar_url").in("id", userIds)
        : { data: [] as any }

    const profMap = new Map((profiles || []).map((p: any) => [p.id, p]))
    const leaderboard = userIds
      .map((uid) => ({
        user_id: uid,
        points: counts[uid] * 100,
        profile: profMap.get(uid) || null,
      }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 100)

    return NextResponse.json(leaderboard)
  } catch (e) {
    console.log("[v0] /api/leaderboard error:", (e as any)?.message || e)
    return NextResponse.json([])
  }
}
