import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface Params {
  params: { id: string }
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = params
    if (!id) return NextResponse.json({ error: "Missing skill id" }, { status: 400 })

    const supabase = await createClient()

    const { data: skill, error: skillErr } = await supabase
      .from("skills")
      .select("id,name,description,category")
      .eq("id", id)
      .single()
    if (skillErr) {
      if ((skillErr as any).code === "PGRST116") return NextResponse.json({ error: "Not found" }, { status: 404 })
      throw skillErr
    }

    const { data: stats, error: statsErr } = await supabase
      .from("skill_stats")
      .select("skill_id,sessions_count,rating_sum,rating_count")
      .eq("skill_id", id)
      .maybeSingle()
    if (statsErr) throw statsErr

    const { data: anyTeacher, error: teacherErr } = await supabase
      .from("user_skills")
      .select("user_id")
      .eq("skill_id", id)
      .eq("skill_type", "teach")
      .limit(1)
      .maybeSingle()
    if (teacherErr) throw teacherErr

    let teacherProfile: any = null
    if (anyTeacher?.user_id) {
      const { data: prof, error: profErr } = await supabase
        .from("profiles")
        .select("id,display_name,avatar_url,location")
        .eq("id", anyTeacher.user_id)
        .single()
      if (profErr && (profErr as any).code !== "PGRST116") throw profErr
      teacherProfile = prof || null
    }

    const avg = stats && Number(stats.rating_count) > 0 ? Number(stats.rating_sum) / Number(stats.rating_count) : 0
    const reviewCount = Number(stats?.rating_count ?? 0)
    const sessionsCount = Number(stats?.sessions_count ?? 0)

    const payload = {
      id: skill.id,
      title: skill.name,
      description: skill.description,
      category: skill.category,
      image: "/skill-image.jpg",
      tags: [] as string[],
      isOnline: true,
      duration: "Flexible",
      nextSession: "Check availability",
      teacher: {
        name: teacherProfile?.display_name ?? "Unknown",
        avatar: teacherProfile?.avatar_url || "/diverse-avatars.png",
        location: teacherProfile?.location ?? "—",
        rating: Number(avg),
        reviewCount,
      },
      studentsCount: sessionsCount,
    }

    return NextResponse.json({ skill: payload })
  } catch (err: any) {
    console.error("[v0] /api/skills/[id] error:", err?.message)
    return NextResponse.json({ error: "Failed to load skill" }, { status: 500 })
  }
}
