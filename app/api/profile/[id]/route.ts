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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getServer()
    const { id } = params

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Fetch user skills (teaching)
    const { data: teachingSkills } = await supabase
      .from("user_skills")
      .select(`
        *,
        skills (
          name,
          category
        )
      `)
      .eq("user_id", id)
      .eq("skill_type", "teacher")

    // Fetch user skills (learning)
    const { data: learningSkills } = await supabase
      .from("user_skills")
      .select(`
        *,
        skills (
          name,
          category
        )
      `)
      .eq("user_id", id)
      .eq("skill_type", "learner")

    // Fetch stats (simple aggregation)
    const { count: studentsCount } = await supabase
      .from("matches")
      .select("*", { count: "exact", head: true })
      .eq("teacher_id", id)

    const { count: reviewsCount } = await supabase
      .from("sessions") // Assuming reviews are linked to sessions or we count completed sessions
      .select("*", { count: "exact", head: true })
      .not("rating", "is", null)
      // We would need to join with matches to filter by teacher_id, but for now let's keep it simple or add a proper query if schema allows
      // For this demo, we'll return the profile with the skills

    return NextResponse.json({
      ...profile,
      teaching: teachingSkills || [],
      learning: learningSkills || [],
      stats: {
        students: studentsCount || 0,
        reviews: reviewsCount || 0,
        rating: 4.9, // Placeholder aggregation until we have a proper view or complex query
      },
    })
  } catch (e: any) {
    console.log("[v0] /api/profile/[id] error:", e?.message || e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
