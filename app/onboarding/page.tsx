"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Target, Sparkles, ArrowRight, ArrowLeft, Check, Upload, MapPin, Clock, Star, Users, MessageCircle, Calendar, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getBrowserSupabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

const SKILLS_CATALOG = [
  { id: 1, name: "Web Development", category: "Technology", popular: true },
  { id: 2, name: "React", category: "Technology", popular: true },
  { id: 3, name: "Python", category: "Technology", popular: true },
  { id: 4, name: "Spanish", category: "Languages", popular: true },
  { id: 5, name: "French", category: "Languages", popular: false },
  { id: 6, name: "Photography", category: "Creative", popular: true },
  { id: 7, name: "Graphic Design", category: "Creative", popular: true },
  { id: 8, name: "Guitar", category: "Music", popular: true },
  { id: 9, name: "Piano", category: "Music", popular: false },
  { id: 10, name: "Cooking", category: "Lifestyle", popular: true },
  { id: 11, name: "Yoga", category: "Fitness", popular: false },
  { id: 12, name: "Marketing", category: "Business", popular: true },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("onboarding_step") : null
    if (saved) setCurrentStep(Number(saved))
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("onboarding_step", String(currentStep))
    }
  }, [currentStep])

  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    location: "",
    avatar: "",
    timezone: "",
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [learningSkills, setLearningSkills] = useState<number[]>([])
  const [teachingSkills, setTeachingSkills] = useState<{ id: number; proficiency: string; rate: string }[]>([])
  const [goals, setGoals] = useState({
    primaryGoal: "",
    timeCommitment: "",
    preferredFormat: "",
  })
  const router = useRouter()

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      try {
        const supabase = getBrowserSupabase()
        const { data: userData, error: userErr } = await supabase.auth.getUser()
        if (!userErr && userData?.user) {
          await supabase
            .from("profiles")
            .update({
              display_name: profile.displayName,
              bio: profile.bio,
              location: profile.location,
              avatar_url: profile.avatar || null,
            })
            .eq("id", userData.user.id)
        }
      } catch (e) {
        console.log("[v0] Onboarding profile save error:", (e as Error).message)
      }
      
      try {
        const res = await fetch("/api/onboarding/complete", { method: "POST" })
        if (!res.ok) throw new Error("Failed to complete onboarding")
        
        document.cookie = "onboarding_completed=1; path=/; max-age=31536000; SameSite=Lax"
        
        if (typeof window !== "undefined") window.localStorage.removeItem("onboarding_step")
        
        window.location.href = "/dashboard"
      } catch (error) {
        console.error("Onboarding completion error:", error)
        toast({
          title: "Error",
          description: "Failed to complete setup. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleLearningSkill = (skillId: number) => {
    setLearningSkills((prev) => (prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]))
  }

  const addTeachingSkill = (skillId: number) => {
    if (!teachingSkills.find((s) => s.id === skillId)) {
      setTeachingSkills((prev) => [...prev, { id: skillId, proficiency: "intermediate", rate: "10" }])
    }
  }

  const removeTeachingSkill = (skillId: number) => {
    setTeachingSkills((prev) => prev.filter((s) => s.id !== skillId))
  }

  const updateTeachingSkill = (skillId: number, field: string, value: string) => {
    setTeachingSkills((prev) => prev.map((skill) => (skill.id === skillId ? { ...skill, [field]: value } : skill)))
  }

  const handleAvatarSelect: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const supabase = getBrowserSupabase()
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user
      if (!user) {
        console.log("[v0] No auth user for avatar upload")
        toast({
          title: "Error",
          description: "You must be logged in to upload a photo.",
          variant: "destructive",
        })
        return
      }
      
      toast({
        title: "Uploading...",
        description: "Please wait while we upload your photo.",
      })

      const path = `${user.id}/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(path)
      const url = publicUrlData.publicUrl
      setProfile((prev) => ({ ...prev, avatar: url }))
      await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id)
      
      toast({
        title: "Success",
        description: "Profile photo uploaded successfully!",
      })
    } catch (err) {
      console.log("[v0] Avatar upload error:", (err as Error).message)
      toast({
        title: "Upload Failed",
        description: "Could not upload photo. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-900">SkillSwap</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
            <Progress value={progress} className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step 1: Welcome & Profile Setup */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-emerald-900">Welcome to SkillSwap!</CardTitle>
              <CardDescription className="text-lg">
                Let's set up your profile to connect you with the perfect learning and teaching opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display Name *</Label>
                    <Input
                      id="displayName"
                      placeholder="How should others see your name?"
                      value={profile.displayName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, displayName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="City, Country"
                        className="pl-10"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={profile.timezone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, timezone: e.target.value }))}
                    >
                      <option value="">Select your timezone</option>
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">GMT (UTC+0)</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+8">Singapore Time (UTC+8)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <Label>Profile Picture</Label>
                    <div className="mt-2 flex flex-col items-center space-y-3">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profile.avatar || "/placeholder.svg?height=96&width=96&query=avatar"} />
                        <AvatarFallback className="text-lg">
                          {profile.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarSelect}
                      />
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Tell us about yourself</Label>
                <Textarea
                  id="bio"
                  placeholder="Share your background, interests, and what you're passionate about..."
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Skills You Want to Learn */}
        {currentStep === 2 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold">What would you like to learn?</CardTitle>
              <CardDescription>
                Select skills you're interested in learning. You can always add more later!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Popular skills to get you started:</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {SKILLS_CATALOG.filter((skill) => skill.popular).map((skill) => (
                      <Badge
                        key={skill.id}
                        variant={learningSkills.includes(skill.id) ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2 text-sm"
                        onClick={() => toggleLearningSkill(skill.id)}
                      >
                        {skill.name}
                        {learningSkills.includes(skill.id) && <Check className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Tabs defaultValue="technology" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="technology">Tech</TabsTrigger>
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                    <TabsTrigger value="creative">Creative</TabsTrigger>
                    <TabsTrigger value="music">Music</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                  </TabsList>

                  {["Technology", "Languages", "Creative", "Music", "Business", "Lifestyle"].map((category) => (
                    <TabsContent key={category} value={category.toLowerCase()} className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {SKILLS_CATALOG.filter((skill) => skill.category === category).map((skill) => (
                          <Card
                            key={skill.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              learningSkills.includes(skill.id)
                                ? "ring-2 ring-emerald-500 bg-emerald-50"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => toggleLearningSkill(skill.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <h3 className="font-medium text-sm">{skill.name}</h3>
                              {learningSkills.includes(skill.id) && (
                                <Check className="w-4 h-4 text-emerald-600 mx-auto mt-2" />
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="text-center text-sm text-gray-600">
                  Selected {learningSkills.length} skills to learn
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Skills You Can Teach */}
        {currentStep === 3 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold">What can you teach?</CardTitle>
              <CardDescription>
                Share your expertise! Add skills you can teach others and set your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {SKILLS_CATALOG.map((skill) => (
                    <Card
                      key={skill.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        teachingSkills.find((s) => s.id === skill.id)
                          ? "ring-2 ring-purple-500 bg-purple-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        if (teachingSkills.find((s) => s.id === skill.id)) {
                          removeTeachingSkill(skill.id)
                        } else {
                          addTeachingSkill(skill.id)
                        }
                      }}
                    >
                      <CardContent className="p-4 text-center">
                        <h3 className="font-medium text-sm">{skill.name}</h3>
                        {teachingSkills.find((s) => s.id === skill.id) && (
                          <Check className="w-4 h-4 text-purple-600 mx-auto mt-2" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {teachingSkills.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Configure Your Teaching Skills</h3>
                    {teachingSkills.map((teachingSkill) => {
                      const skill = SKILLS_CATALOG.find((s) => s.id === teachingSkill.id)
                      return (
                        <Card key={teachingSkill.id} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{skill?.name}</h4>
                            <Button variant="ghost" size="sm" onClick={() => removeTeachingSkill(teachingSkill.id)}>
                              Remove
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Proficiency Level</Label>
                              <select
                                className="w-full p-2 border rounded-md"
                                value={teachingSkill.proficiency}
                                onChange={(e) => updateTeachingSkill(teachingSkill.id, "proficiency", e.target.value)}
                              >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                              </select>
                            </div>
                            <div>
                              <Label>Skill Credits per Hour</Label>
                              <div className="relative">
                                <Star className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input
                                  type="number"
                                  placeholder="10"
                                  className="pl-10"
                                  value={teachingSkill.rate}
                                  onChange={(e) => updateTeachingSkill(teachingSkill.id, "rate", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Learning Goals & Preferences */}
        {currentStep === 4 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Set Your Learning Goals</CardTitle>
              <CardDescription>
                Help us personalize your experience and match you with the right opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>What's your primary goal on SkillSwap?</Label>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {[
                    "Learn new skills for career advancement",
                    "Teach others and share my expertise",
                    "Build a side income through teaching",
                    "Connect with like-minded learners",
                    "Explore new hobbies and interests",
                  ].map((goal) => (
                    <Card
                      key={goal}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        goals.primaryGoal === goal ? "ring-2 ring-orange-500 bg-orange-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setGoals((prev) => ({ ...prev, primaryGoal: goal }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{goal}</span>
                          {goals.primaryGoal === goal && <Check className="w-4 h-4 text-orange-600" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label>How much time can you commit per week?</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["1-2 hours", "3-5 hours", "6-10 hours", "10+ hours"].map((time) => (
                    <Card
                      key={time}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        goals.timeCommitment === time ? "ring-2 ring-orange-500 bg-orange-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setGoals((prev) => ({ ...prev, timeCommitment: time }))}
                    >
                      <CardContent className="p-3 text-center">
                        <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                        <span className="text-sm">{time}</span>
                        {goals.timeCommitment === time && <Check className="w-4 h-4 text-orange-600 mx-auto mt-1" />}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label>Preferred learning format?</Label>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {[
                    "One-on-one sessions",
                    "Small group sessions (2-4 people)",
                    "Larger group sessions (5+ people)",
                    "Mix of formats",
                  ].map((format) => (
                    <Card
                      key={format}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        goals.preferredFormat === format ? "ring-2 ring-orange-500 bg-orange-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setGoals((prev) => ({ ...prev, preferredFormat: format }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{format}</span>
                          {goals.preferredFormat === format && <Check className="w-4 h-4 text-orange-600" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Platform Tour & Completion */}
        {currentStep === 5 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">You're all set!</CardTitle>
              <CardDescription>Here's how to make the most of SkillSwap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Browse & Learn</h3>
                  <p className="text-sm text-gray-600">
                    Explore skills, find teachers, and book your first learning session
                  </p>
                </Card>

                <Card className="text-center p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Teach & Earn</h3>
                  <p className="text-sm text-gray-600">Share your skills, help others learn, and earn skill credits</p>
                </Card>

                <Card className="text-center p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Connect & Grow</h3>
                  <p className="text-sm text-gray-600">Build relationships, get feedback, and track your progress</p>
                </Card>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-emerald-900 mb-3">Your Profile Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Learning:</strong> {learningSkills.length} skills selected
                    </p>
                    <p>
                      <strong>Teaching:</strong> {teachingSkills.length} skills configured
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Goal:</strong> {goals.primaryGoal}
                    </p>
                    <p>
                      <strong>Time Commitment:</strong> {goals.timeCommitment}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold mb-4">Ready to start your learning journey?</h3>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Skills
                  </Button>
                  <Button size="lg" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 max-w-4xl mx-auto">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !profile.displayName) ||
              (currentStep === 2 && learningSkills.length === 0) ||
              (currentStep === 4 && (!goals.primaryGoal || !goals.timeCommitment || !goals.preferredFormat))
            }
          >
            {currentStep === totalSteps ? "Complete Setup" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
