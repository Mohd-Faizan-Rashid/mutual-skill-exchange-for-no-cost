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
    if (!user) return NextResponse.json({ conversations: [], messages: [] })

    const matchId = req.nextUrl.searchParams.get("match_id")
    if (matchId) {
      const { data: msgs } = await supabase
        .from("messages")
        .select("id,match_id,sender_id,content,message_type,created_at")
        .eq("match_id", matchId)
        .order("created_at", { ascending: true })
        .limit(500)
      return NextResponse.json({ messages: msgs || [] })
    }

    // conversations: last message per match for current user
    const { data: matches } = await supabase
      .from("matches")
      .select("id,teacher_id,learner_id,updated_at")
      .or(`teacher_id.eq.${user.id},learner_id.eq.${user.id}`)
      .order("updated_at", { ascending: false })
      .limit(50)

    const conversations = []
    for (const m of matches || []) {
      const { data: last } = await supabase
        .from("messages")
        .select("id,content,created_at,sender_id")
        .eq("match_id", m.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
      conversations.push({ match_id: m.id, last_message: last || null, updated_at: m.updated_at })
    }

    return NextResponse.json({ conversations })
  } catch (e: any) {
    console.log("[v0] /api/messages GET error:", e?.message || e)
    return NextResponse.json({ conversations: [], messages: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { match_id, content, message_type = "text" } = await req.json()
    const supabase = getServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data, error } = await supabase
      .from("messages")
      .insert([{ match_id, sender_id: user.id, content, message_type }])
      .select()
      .maybeSingle()
    if (error) throw error
    return NextResponse.json(data)
  } catch (e: any) {
    console.log("[v0] /api/messages POST error:", e?.message || e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
