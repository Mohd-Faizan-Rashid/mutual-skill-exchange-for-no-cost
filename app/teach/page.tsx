"use client"

import type React from "react"

import { useState, useRef } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"

let supabaseBrowser: ReturnType<typeof createBrowserClient> | null = null
function getSupabaseBrowser() {
  if (!supabaseBrowser) {
    supabaseBrowser = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabaseBrowser
}

export default function TeachPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    hourlyRate: "10",
    availability: "Weekdays",
  })
  const [imageUrl, setImageUrl] = useState<string>("")
  const fileRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const onImageSelected: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const supabase = getSupabaseBrowser()
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return
    const path = `${auth.user.id}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from("skill-images").upload(path, file, { upsert: true })
    if (error) {
      console.log("[v0] skill image upload error:", error.message)
      return
    }
    const { data } = supabase.storage.from("skill-images").getPublicUrl(path)
    setImageUrl(data.publicUrl)
  }

  const onSubmit = async () => {
    const supabase = getSupabaseBrowser()
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return
    // Insert or reuse skill by name
    const { data: newSkill, error: insertErr } = await supabase
      .from("skills")
      .insert([{ name: form.name, category: form.category, description: form.description, image_url: imageUrl }])
      .select()
      .single()

    if (insertErr) {
      console.log("[v0] skill insert error:", insertErr.message)
      return
    }

    // Link to user_skills as teaching
    await supabase.from("user_skills").insert([
      {
        user_id: auth.user.id,
        skill_id: newSkill.id,
        skill_type: "teaching",
        proficiency_level: "advanced",
        availability: form.availability,
        hourly_rate: form.hourlyRate,
      },
    ])

    router.push(`/skills/${newSkill.id}`)
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Teach a New Skill</CardTitle>
          <CardDescription>Create a listing for the skill you want to teach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          </div>
          <div>
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Hourly Rate (credits)</Label>
              <Input
                type="number"
                value={form.hourlyRate}
                onChange={(e) => setForm((s) => ({ ...s, hourlyRate: e.target.value }))}
              />
            </div>
            <div>
              <Label>Availability</Label>
              <Input
                value={form.availability}
                onChange={(e) => setForm((s) => ({ ...s, availability: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Skill Photo</Label>
            <div className="mt-2 flex items-center gap-3">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImageSelected} />
              <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" /> Upload Photo
              </Button>
              {imageUrl ? <span className="text-sm text-muted-foreground truncate max-w-[50%]">{imageUrl}</span> : null}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={onSubmit} disabled={!form.name || !form.description}>
              Create Skill
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
