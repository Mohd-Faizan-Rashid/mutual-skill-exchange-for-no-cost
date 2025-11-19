"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Crown, Zap, Target, Calendar, Gift, Flame, Award } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"
const fetcher = (u: string) => fetch(u).then((r) => r.json())

interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  avatar: string
  points: number
  level: number
  streak: number
  skillsLearned: number
  skillsTaught: number
  badge?: string
  isCurrentUser?: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly"
  progress: number
  maxProgress: number
  reward: {
    points: number
    badge?: string
  }
  expiresAt: Date
  completed: boolean
}

interface Reward {
  id: string
  title: string
  description: string
  cost: number
  type: "badge" | "feature" | "cosmetic"
  icon: string
  available: boolean
}

export default function LeaderboardPage() {
  const { data: lb, isLoading } = useSWR("/api/leaderboard", fetcher)
  const leaderboard = lb || []
  const currentUser = leaderboard[0]?.profile
    ? { rank: 1, level: 1, streak: 0, points: leaderboard[0].points, avatar: leaderboard[0].profile.avatar_url }
    : null
  const userPoints = currentUser?.points || 0

  const [activeTab, setActiveTab] = useState("leaderboard")
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "all-time">("weekly")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>
    }
  }

  const getChallengeIcon = (type: Challenge["type"]) => {
    switch (type) {
      case "daily":
        return <Calendar className="w-4 h-4 text-blue-500" />
      case "weekly":
        return <Target className="w-4 h-4 text-green-500" />
      case "monthly":
        return <Trophy className="w-4 h-4 text-purple-500" />
    }
  }

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    }
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SkillSwap</span>
            </Link>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              <Flame className="w-3 h-3 mr-1" />
              Gamification
            </Badge>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/progress">Progress</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard & Rewards</h1>
          <p className="text-muted-foreground text-lg">Compete, achieve, and unlock exclusive rewards</p>
        </div>

        {/* User Stats Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">Level {currentUser?.level}</h3>
                  <p className="text-muted-foreground">Rank #{currentUser?.rank}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{userPoints} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">{currentUser?.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{userPoints}</div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <div className="mt-2">
                  <Progress value={75} className="w-32 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">75% to next level</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-6">
            {/* Timeframe Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Timeframe:</span>
              {(["weekly", "monthly", "all-time"] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1).replace("-", " ")}
                </Button>
              ))}
            </div>

            {/* Top 3 Podium */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>This week's learning champions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-center gap-4 mb-6">
                  {/* 2nd Place */}
                  {leaderboard.length > 1 && (
                    <div className="text-center">
                      <div className="w-20 h-16 bg-gray-200 rounded-t-lg flex items-end justify-center pb-2">
                        <span className="text-2xl font-bold text-gray-600">2</span>
                      </div>
                      <Avatar className="w-12 h-12 mx-auto mt-2">
                        <AvatarImage src={leaderboard[1].profile.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>
                          {leaderboard[1].profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium mt-1">{leaderboard[1].profile.name}</p>
                      <p className="text-xs text-muted-foreground">{leaderboard[1].points} pts</p>
                    </div>
                  )}

                  {/* 1st Place */}
                  {leaderboard.length > 0 && (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
                        <Crown className="w-8 h-8 text-yellow-800" />
                      </div>
                      <Avatar className="w-16 h-16 mx-auto mt-2 border-4 border-yellow-400">
                        <AvatarImage src={leaderboard[0].profile.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>
                          {leaderboard[0].profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium mt-1">{leaderboard[0].profile.name}</p>
                      <p className="text-xs text-muted-foreground">{leaderboard[0].points} pts</p>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {leaderboard.length > 2 && (
                    <div className="text-center">
                      <div className="w-20 h-12 bg-amber-600 rounded-t-lg flex items-end justify-center pb-2">
                        <span className="text-2xl font-bold text-amber-100">3</span>
                      </div>
                      <Avatar className="w-12 h-12 mx-auto mt-2">
                        <AvatarImage src={leaderboard[2].profile.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>
                          {leaderboard[2].profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium mt-1">{leaderboard[2].profile.name}</p>
                      <p className="text-xs text-muted-foreground">{leaderboard[2].points} pts</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Full Rankings</CardTitle>
                <CardDescription>Complete leaderboard for {timeframe.replace("-", " ")} period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        entry.profile.id === currentUser?.id ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>

                      <Avatar className="w-10 h-10">
                        <AvatarImage src={entry.profile.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>
                          {entry.profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{entry.profile.name}</h4>
                          {entry.profile.id === currentUser?.id && <Badge variant="secondary">You</Badge>}
                          {entry.badge && (
                            <Badge variant="outline" className="text-xs">
                              {entry.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Level {entry.level}</span>
                          <span>{entry.streak} day streak</span>
                          <span>{entry.skillsLearned} learned</span>
                          <span>{entry.skillsTaught} taught</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{entry.points}</div>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            {/* Challenges content remains unchanged */}
            {/* Placeholder for challenges content */}
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            {/* Rewards content remains unchanged */}
            {/* Placeholder for rewards content */}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {/* Achievements content remains unchanged */}
            {/* Placeholder for achievements content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
