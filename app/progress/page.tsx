"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import useSWR from "swr"
import {
  TrendingUp,
  Target,
  Clock,
  Award,
  BookOpen,
  CalendarIcon,
  CheckCircle,
  Circle,
  Trophy,
  Zap,
  BarChart3,
  LineChart,
} from "lucide-react"
import Link from "next/link"

interface Skill {
  id: string
  name: string
  category: string
  progress: number
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  hoursSpent: number
  totalHours: number
  teacher: {
    name: string
    avatar: string
  }
  milestones: Milestone[]
  nextSession?: Date
}

interface Milestone {
  id: string
  title: string
  description: string
  completed: boolean
  completedDate?: Date
  points: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned_at: Date
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ProgressPage() {
  const { data, isLoading } = useSWR("/api/progress", fetcher)
  const sessions = data?.sessions || []
  const achievements = data?.achievements || []
  const totalHoursSpent = sessions.reduce((acc: number, s: any) => acc + (s.duration_minutes || 0) / 60, 0)
  const completedMilestones = 0
  const totalMilestones = 0
  const totalPoints = achievements.length * 100

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "Rare":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Epic":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Legendary":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SkillSwap</span>
            </Link>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              Progress Tracking
            </Badge>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/smart-match">Smart Match</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
          <p className="text-muted-foreground text-lg">Track your skill development and celebrate achievements</p>
        </div>

        <Tabs value={data?.activeTab || "overview"} onValueChange={(tab) => console.log(tab)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Total Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalHoursSpent.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">+8 hours this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {completedMilestones}/{totalMilestones}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((completedMilestones / totalMilestones) * 100)}% completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Points Earned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPoints}</div>
                  <p className="text-xs text-muted-foreground">+250 points this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{achievements.length}</div>
                  <p className="text-xs text-muted-foreground">+1 this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Weekly Learning Activity
                </CardTitle>
                <CardDescription>Your learning hours over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                    const hours = Math.floor(Math.random() * 4) + 1
                    return (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium">{day}</div>
                        <div className="flex-1">
                          <Progress value={(hours / 4) * 100} className="h-2" />
                        </div>
                        <div className="w-12 text-sm text-muted-foreground">{hours}h</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest unlocked achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((a: any) => (
                    <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="text-2xl">🏅</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{a.title || "Achievement"}</h4>
                          <Badge variant="outline" className="text-xs">
                            Earned
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{a.description || ""}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {a.earned_at ? new Date(a.earned_at).toLocaleDateString() : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data?.skills?.map((skill: Skill) => (
                <Card key={skill.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant="outline">{skill.category}</Badge>
                          <Badge variant="secondary">{skill.level}</Badge>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{skill.progress}%</div>
                        <p className="text-xs text-muted-foreground">
                          {skill.hoursSpent}/{skill.totalHours}h
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Progress value={skill.progress} className="h-2" />

                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={skill.teacher.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {skill.teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{skill.teacher.name}</p>
                        {skill.nextSession && (
                          <p className="text-xs text-muted-foreground">
                            Next session: {skill.nextSession.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Milestones</h4>
                      {skill.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                          {milestone.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <p className={`text-sm ${milestone.completed ? "line-through text-muted-foreground" : ""}`}>
                              {milestone.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{milestone.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {milestone.points} pts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((a: any) => (
                <Card key={a.id} className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-2">🏅</div>
                    <CardTitle className="text-lg">{a.title || "Achievement"}</CardTitle>
                    <CardDescription>{a.description || ""}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        Earned
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Unlocked on {a.earned_at ? new Date(a.earned_at).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievement Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Achievement Progress</CardTitle>
                <CardDescription>Track your progress towards upcoming achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Speed Learner</span>
                      <span className="text-sm text-muted-foreground">7/10 sessions</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-muted-foreground">Complete 10 learning sessions in a week</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Skill Master</span>
                      <span className="text-sm text-muted-foreground">1/3 skills</span>
                    </div>
                    <Progress value={33} className="h-2" />
                    <p className="text-xs text-muted-foreground">Reach advanced level in 3 different skills</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Community Helper</span>
                      <span className="text-sm text-muted-foreground">3/5 reviews</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground">Leave 5 helpful reviews for teachers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Calendar</CardTitle>
                  <CardDescription>View your learning schedule and sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={data?.selectedDate}
                    onSelect={(date: Date) => console.log(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data?.skills
                      .filter((skill: Skill) => skill.nextSession)
                      .map((skill: Skill) => (
                        <div key={skill.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={skill.teacher.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {skill.teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{skill.name}</h4>
                            <p className="text-sm text-muted-foreground">with {skill.teacher.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {skill.nextSession?.toLocaleDateString()} at{" "}
                              {skill.nextSession?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Join
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
