"use client"

import { createBrowserClient } from "@supabase/ssr"

let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!browserClient) {
    if (!url || !anon) {
      console.error(
        "[v0] Missing Supabase envs. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vars.",
      )
    }
    browserClient = createBrowserClient(url as string, anon as string)
  }
  return browserClient
}

export const getBrowserSupabase = createClient
