import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const rawQ = (searchParams.get("q") || "").trim()
    const q = rawQ.replace(/[%_]/g, "") // strip wildcard chars to avoid overly-broad matches
    const category = (searchParams.get("category") || "").trim()
    const page = Math.max(1, Number(searchParams.get("page") ?? 1))
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)))
    const offset = (page - 1) * limit

    const supabase = await createClient()

    let skillsQuery = supabase.from("skills").select("id,name,description,category", { count: "exact" })

    if (q) {
      skillsQuery = skillsQuery.or(`name.ilike.%${q}%,description.ilike.%${q}%`)
    }
    if (category) {
      skillsQuery = skillsQuery.eq("category", category)
    }

    skillsQuery = skillsQuery.range(offset, offset + limit - 1)

    const { data: skills, error: skillsErr, count } = await skillsQuery
    if (skillsErr) throw skillsErr
    if (!skills || skills.length === 0) {
      return NextResponse.json({ skills: [], page, limit, total: count ?? 0 })
    }

    const skillIds = skills.map((s) => s.id)

    const { data: statsRows, error: statsErr } =
      skillIds.length === 0
        ? { data: [], error: null }
        : await supabase
            .from("skill_stats")
            .select("skill_id,sessions_count,rating_sum,rating_count")
            .in("skill_id", skillIds)
    if (statsErr) throw statsErr
    const statsBySkill = new Map<string, { sessions_count: number; rating_sum: number; rating_count: number }>()
    for (const r of statsRows || []) statsBySkill.set(r.skill_id as string, r as any)

    const { data: teachers, error: teachersErr } =
      skillIds.length === 0
        ? { data: [], error: null }
        : await supabase
            .from("user_skills")
            .select("user_id,skill_id")
            .eq("skill_type", "teach")
            .in("skill_id", skillIds)
            .limit(500)
    if (teachersErr) throw teachersErr

    const teacherBySkill = new Map<string, string>()
    for (const row of teachers || []) {
      if (!teacherBySkill.has(row.skill_id as string)) {
        teacherBySkill.set(row.skill_id as string, row.user_id as string)
      }
    }

    const teacherIds = Array.from(new Set(Array.from(teacherBySkill.values())))

    const { data: profiles, error: pErr } =
      teacherIds.length === 0
        ? { data: [], error: null }
        : await supabase.from("profiles").select("id,display_name,avatar_url,location").in("id", teacherIds)
    if (pErr) throw pErr
    const profById = new Map<string, any>()
    for (const p of profiles || []) profById.set(p.id, p)

    const payload = skills.map((s) => {
      const stats = statsBySkill.get(s.id) || { sessions_count: 0, rating_sum: 0, rating_count: 0 }
      const avg = Number(stats.rating_count) > 0 ? Number(stats.rating_sum) / Number(stats.rating_count) : 0

      const tid = teacherBySkill.get(s.id) || null
      const teacher = tid ? profById.get(tid) : null

      return {
        id: s.id,
        title: s.name,
        description: s.description,
        category: s.category,
        image: "/skill-image.jpg",
        tags: [] as string[],
        isOnline: true,
        duration: "Flexible",
        nextSession: "Check availability",
        teacher: {
          name: teacher?.display_name ?? "Unknown",
          avatar: teacher?.avatar_url || "/diverse-avatars.png",
          location: teacher?.location ?? "—",
          rating: Number(avg),
          reviewCount: Number(stats.rating_count ?? 0),
        },
        studentsCount: Number(stats.sessions_count ?? 0),
      }
    })

    payload.sort((a, b) => {
      if (b.teacher.rating !== a.teacher.rating) return b.teacher.rating - a.teacher.rating
      return b.studentsCount - a.studentsCount
    })

    return NextResponse.json({ skills: payload, page, limit, total: count ?? payload.length })
  } catch (err: any) {
    console.error("[v0] /api/skills error:", err?.message)
    return NextResponse.json({ error: "Failed to load skills" }, { status: 500 })
  }
}
