import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(Number(searchParams.get("page") || 1), 1)
    const limit = Math.min(Math.max(Number(searchParams.get("limit") || 10), 1), 50)
    const offset = (page - 1) * limit

    const skillId = params.id
    const supabase = await createClient()

    // Matches for this skill
    const { data: matches, error: matchesErr } = await supabase
      .from("matches")
      .select("id,teacher_id,learner_id")
      .eq("skill_id", skillId)
    if (matchesErr) throw matchesErr
    const matchIds = (matches || []).map((m) => m.id)

    // Total rated sessions
    let total = 0
    if (matchIds.length) {
      const { count, error: totalErr } = await supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .in("match_id", matchIds)
        .not("rating", "is", null)
      if (totalErr) throw totalErr
      total = Number(count ?? 0)
    }

    // Page of rated sessions
    const { data: sessions, error: sessErr } =
      matchIds.length === 0
        ? { data: [], error: null }
        : await supabase
            .from("sessions")
            .select("id,match_id,rating,feedback,created_at")
            .in("match_id", matchIds)
            .not("rating", "is", null)
            .order("created_at", { ascending: false })
            .range(offset, offset + limit - 1)
    if (sessErr) throw sessErr

    // Gather profile info for teacher/learner
    const teacherIds = new Set<string>()
    const learnerIds = new Set<string>()
    const matchById = new Map<string, any>()
    for (const m of matches || []) matchById.set(m.id, m)
    for (const s of sessions || []) {
      const m = matchById.get(s.match_id)
      if (m?.teacher_id) teacherIds.add(m.teacher_id)
      if (m?.learner_id) learnerIds.add(m.learner_id)
    }
    const allProfileIds = Array.from(new Set([...teacherIds, ...learnerIds]))
    const { data: profiles, error: profErr } =
      allProfileIds.length === 0
        ? { data: [], error: null }
        : await supabase.from("profiles").select("id,display_name,avatar_url").in("id", allProfileIds)
    if (profErr) throw profErr
    const profById = new Map<string, any>()
    for (const p of profiles || []) profById.set(p.id, p)

    const rows = (sessions || []).map((s) => {
      const m = matchById.get(s.match_id)
      const t = m ? profById.get(m.teacher_id) : null
      const l = m ? profById.get(m.learner_id) : null
      return {
        id: s.id,
        rating: s.rating,
        feedback: s.feedback,
        created_at: s.created_at,
        match_id: s.match_id,
        teacher_name: t?.display_name ?? null,
        teacher_avatar: t?.avatar_url ?? null,
        learner_name: l?.display_name ?? null,
        learner_avatar: l?.avatar_url ?? null,
      }
    })

    return NextResponse.json({
      data: rows,
      page,
      limit,
      total,
    })
  } catch (err: any) {
    console.error("[v0] /api/skills/[id]/reviews error:", err?.message)
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 })
  }
}
