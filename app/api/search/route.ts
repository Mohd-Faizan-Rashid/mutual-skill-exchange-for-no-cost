import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const rawQ = (searchParams.get("q") || "").trim()
    const q = rawQ.replace(/[%_]/g, "")
    const type = (searchParams.get("type") || "").trim() // optional: 'skills' | 'profiles'
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 25)))

    if (!q) return NextResponse.json({ skills: [], profiles: [] })

    const like = `%${q}%`
    const supabase = await createClient()

    const needsSkills = !type || type === "skills"
    const needsProfiles = !type || type === "profiles"

    const results = await Promise.all([
      needsSkills
        ? supabase
            .from("skills")
            .select("id,name,category,description")
            .or(`name.ilike.${like},description.ilike.${like}`)
            .order("name", { ascending: true })
            .limit(limit)
        : Promise.resolve({ data: [], error: null }),
      needsProfiles
        ? supabase
            .from("profiles")
            .select("id,display_name,avatar_url,location,bio")
            .or(`display_name.ilike.${like},bio.ilike.${like}`)
            .order("display_name", { ascending: true })
            .limit(limit)
        : Promise.resolve({ data: [], error: null }),
    ])

    const [{ data: skills, error: skillsErr }, { data: profiles, error: profilesErr }] = results as any
    if (skillsErr) throw skillsErr
    if (profilesErr) throw profilesErr

    return NextResponse.json({ skills: skills || [], profiles: profiles || [] })
  } catch (err: any) {
    console.error("[v0] /api/search error:", err?.message)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
