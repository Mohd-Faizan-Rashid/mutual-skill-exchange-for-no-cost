"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmEmailPage() {
  const router = useRouter()
  const search = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const code = search.get("code")
      const next = search.get("next") || "/onboarding"
      const supabase = createClient()
      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) throw error
          router.replace(next)
        } else {
          // Fallback: try parsing hash (older links)
          const hash = window.location.hash
          if (hash.includes("access_token")) {
            // Supabase JS will parse the hash automatically if we call getSession
            const { data, error } = await supabase.auth.getSession()
            if (error || !data.session) throw error ?? new Error("No session")
            router.replace(next)
          } else {
            throw new Error("Missing confirmation code")
          }
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Confirmation failed")
      }
    }
    run()
  }, [router, search])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirming your email…</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-600">{error}. Please request a new link by signing in again.</div>
          ) : (
            <div className="flex items-center gap-3">
              <Spinner /> <span>Setting up your session…</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
