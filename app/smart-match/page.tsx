"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Brain, Target, Filter, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function SmartMatchPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/matches", fetcher)
  const matches = data || []
  const [filters, setFilters] = useState({
    maxDistance: [50],
    minRating: [4.0],
    availability: "",
    level: "",
    instantBooking: false,
  })
  const [activeTab, setActiveTab] = useState("matches")

  const handleLike = async (id: string) => {
    // In a real app you'd send a request to create a connection. For now just remove from list.
    await mutate(
      matches.filter((m: any) => m.id !== id),
      { revalidate: false },
    )
  }

  const handlePass = async (id: string) => {
    // In a real app you'd send a request to pass on a match. For now just remove from list.
    await mutate(
      matches.filter((m: any) => m.id !== id),
      { revalidate: false },
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SkillSwap</span>
            </Link>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Smart Match
            </Badge>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/messages">Messages</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Smart Match</h1>
          <p className="text-muted-foreground text-lg">AI-powered matching to find your perfect learning partner</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="matches" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="filters" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            ) : matches.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {matches.map((m: any) => (
                  <Card key={m.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={m.counterpart?.avatar_url || "/placeholder.svg"}
                              alt={m.counterpart?.display_name || ""}
                            />
                            <AvatarFallback>
                              {(m.counterpart?.display_name || "U")
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{m.counterpart?.display_name || "Connection"}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              {m.counterpart?.location || "—"}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">{m.status || "pending"}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleLike(m.id)}
                        >
                          Pass
                        </Button>
                        <Button size="sm" className="flex-1">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No matches yet</h3>
                  <p className="text-muted-foreground mb-4">Try browsing skills and requesting a match.</p>
                  <Button asChild>
                    <Link href="/browse">Browse Skills</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="filters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Preferences</CardTitle>
                <CardDescription>Customize your matching criteria to find the perfect learning partner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Maximum Distance: {filters.maxDistance[0]} miles</Label>
                  <Slider
                    value={filters.maxDistance}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, maxDistance: value }))}
                    max={100}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Minimum Rating: {filters.minRating[0]}</Label>
                  <Slider
                    value={filters.minRating}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, minRating: value }))}
                    max={5}
                    min={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Preferred Availability</Label>
                  <Input
                    id="availability"
                    placeholder="e.g., Weekday evenings, Weekends"
                    value={filters.availability}
                    onChange={(e) => setFilters((prev) => ({ ...prev, availability: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Skill Level</Label>
                  <Input
                    id="level"
                    placeholder="e.g., Beginner, Intermediate, Advanced"
                    value={filters.level}
                    onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value }))}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="instant-booking"
                    checked={filters.instantBooking}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, instantBooking: checked }))}
                  />
                  <Label htmlFor="instant-booking">Instant booking available</Label>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Connection Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Match Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">+3% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-xs text-muted-foreground">-0.5h from last week</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Match Quality Over Time</CardTitle>
                <CardDescription>Your matching algorithm is getting smarter with each interaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Algorithm Accuracy</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Satisfaction</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Successful Connections</span>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
