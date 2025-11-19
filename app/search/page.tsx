"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Star,
  MapPin,
  BookOpen,
  Search,
  Filter,
  Users,
  MessageCircle,
  Heart,
  TrendingUp,
  History,
  X,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const searchData = {
  skills: [
    {
      id: 1,
      title: "Full-Stack Web Development",
      teacher: "Sarah Chen",
      avatar: "/professional-woman-headshot.png",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 127,
      description: "Learn modern web development with React, Node.js, and databases.",
      category: "Technology",
      level: "Beginner to Advanced",
      studentsCount: 89,
      tags: ["React", "Node.js", "JavaScript"],
      isOnline: true,
    },
    {
      id: 2,
      title: "Acoustic Guitar for Beginners",
      teacher: "Mike Rodriguez",
      avatar: "/professional-man-headshot.png",
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 89,
      description: "Start your musical journey with acoustic guitar.",
      category: "Music",
      level: "Beginner",
      studentsCount: 32,
      tags: ["Guitar", "Music Theory", "Chords"],
      isOnline: false,
    },
    {
      id: 3,
      title: "Portrait Photography Masterclass",
      teacher: "Emma Wilson",
      avatar: "/professional-woman-headshot.png",
      location: "New York, NY",
      rating: 5.0,
      reviewCount: 45,
      description: "Master the art of portrait photography with lighting and composition.",
      category: "Arts & Crafts",
      level: "Intermediate",
      studentsCount: 28,
      tags: ["Photography", "Lighting", "Composition"],
      isOnline: true,
    },
  ],
  teachers: [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/professional-woman-headshot.png",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 127,
      bio: "Full-stack developer with 8+ years of experience.",
      skills: ["Web Development", "React", "Node.js"],
      studentsCount: 245,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      avatar: "/professional-man-headshot.png",
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 89,
      bio: "Professional musician and guitar instructor.",
      skills: ["Guitar", "Music Theory", "Songwriting"],
      studentsCount: 156,
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/professional-woman-headshot.png",
      location: "New York, NY",
      rating: 5.0,
      reviewCount: 45,
      bio: "Award-winning photographer specializing in portraits.",
      skills: ["Photography", "Lighting", "Post-processing"],
      studentsCount: 89,
    },
  ],
}

const trendingSearches = [
  "Web Development",
  "Guitar Lessons",
  "Photography",
  "Spanish Language",
  "Cooking",
  "Yoga",
  "Digital Marketing",
  "Piano",
]

const recentSearches = ["React Tutorial", "Portrait Photography", "Italian Cooking", "Spanish Conversation"]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams?.get("q") || "")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "All Categories",
    level: "All Levels",
    rating: [0],
    onlineOnly: false,
    location: "",
  })

  useEffect(() => {
    const q = searchParams?.get("q")
    if (q) {
      setQuery(q)
    }
  }, [searchParams])

  const filteredSkills = searchData.skills.filter((skill) => {
    const matchesQuery =
      skill.title.toLowerCase().includes(query.toLowerCase()) ||
      skill.description.toLowerCase().includes(query.toLowerCase()) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
      skill.teacher.toLowerCase().includes(query.toLowerCase())

    const matchesCategory = filters.category === "All Categories" || skill.category === filters.category
    const matchesLevel = filters.level === "All Levels" || skill.level.includes(filters.level)
    const matchesRating = skill.rating >= filters.rating[0]
    const matchesOnline = !filters.onlineOnly || skill.isOnline
    const matchesLocation = !filters.location || skill.location.toLowerCase().includes(filters.location.toLowerCase())

    return matchesQuery && matchesCategory && matchesLevel && matchesRating && matchesOnline && matchesLocation
  })

  const filteredTeachers = searchData.teachers.filter((teacher) => {
    const matchesQuery =
      teacher.name.toLowerCase().includes(query.toLowerCase()) ||
      teacher.bio.toLowerCase().includes(query.toLowerCase()) ||
      teacher.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase()))

    const matchesRating = teacher.rating >= filters.rating[0]
    const matchesLocation = !filters.location || teacher.location.toLowerCase().includes(filters.location.toLowerCase())

    return matchesQuery && matchesRating && matchesLocation
  })

  const clearFilters = () => {
    setFilters({
      category: "All Categories",
      level: "All Levels",
      rating: [0],
      onlineOnly: false,
      location: "",
    })
  }

  const addToRecentSearches = (searchTerm: string) => {
    setQuery(searchTerm)
    // In a real app, this would save to localStorage or user preferences
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <Link href="/" className="text-xl font-bold text-foreground">
              SkillSwap
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse Skills
            </Link>
            <Link href="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
              Messages
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search SkillSwap</h1>

          {/* Main Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for skills, teachers, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setQuery("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Quick Suggestions */}
          {!query && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => addToRecentSearches(search)}
                      className="h-8"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                  <History className="w-4 h-4 mr-2" />
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => addToRecentSearches(search)}
                      className="h-8 text-muted-foreground"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {query && (
          <>
            {/* Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground">
                  {filteredSkills.length + filteredTeachers.length} results for "{query}"
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={filters.category}
                          onValueChange={(value) => setFilters({ ...filters, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Categories">All Categories</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Music">Music</SelectItem>
                            <SelectItem value="Arts & Crafts">Arts & Crafts</SelectItem>
                            <SelectItem value="Languages">Languages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Level</label>
                        <Select
                          value={filters.level}
                          onValueChange={(value) => setFilters({ ...filters, level: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All Levels">All Levels</SelectItem>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          placeholder="Enter city or state"
                          value={filters.location}
                          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Minimum Rating</label>
                        <Slider
                          value={filters.rating}
                          onValueChange={(value) => setFilters({ ...filters, rating: value })}
                          max={5}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="text-xs text-muted-foreground text-center">
                          {filters.rating[0].toFixed(1)}+ stars
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="online-only"
                          checked={filters.onlineOnly}
                          onCheckedChange={(checked) => setFilters({ ...filters, onlineOnly: checked as boolean })}
                        />
                        <label htmlFor="online-only" className="text-sm">
                          Online sessions only
                        </label>
                      </div>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All ({filteredSkills.length + filteredTeachers.length})</TabsTrigger>
                <TabsTrigger value="skills">Skills ({filteredSkills.length})</TabsTrigger>
                <TabsTrigger value="teachers">Teachers ({filteredTeachers.length})</TabsTrigger>
              </TabsList>

              {/* All Results */}
              <TabsContent value="all" className="space-y-6">
                {filteredSkills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSkills.slice(0, 6).map((skill) => (
                        <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg line-clamp-1">{skill.title}</CardTitle>
                                <CardDescription className="line-clamp-2">{skill.description}</CardDescription>
                              </div>
                              <Badge variant="secondary" className="ml-2">
                                {skill.category}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-3 mb-4">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={skill.avatar || "/placeholder.svg"} alt={skill.teacher} />
                                <AvatarFallback>
                                  {skill.teacher
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{skill.teacher}</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {skill.location}
                                </div>
                              </div>
                              <div className="flex items-center text-sm">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{skill.rating}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1" size="sm" asChild>
                                <Link href={`/skills/${skill.id}`}>View Skill</Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {filteredTeachers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Teachers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTeachers.slice(0, 4).map((teacher) => (
                        <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                                <AvatarFallback>
                                  {teacher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{teacher.name}</h4>
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {teacher.location}
                                </div>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{teacher.bio}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    <span className="font-medium">{teacher.rating}</span>
                                    <span className="text-muted-foreground ml-1">({teacher.reviewCount})</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Users className="w-4 h-4 mr-1" />
                                    {teacher.studentsCount} students
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button size="sm" asChild>
                                    <Link href={`/profile/${teacher.id}`}>View Profile</Link>
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <MessageCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Skills Results */}
              <TabsContent value="skills">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkills.map((skill) => (
                    <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-1">{skill.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{skill.description}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {skill.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={skill.avatar || "/placeholder.svg"} alt={skill.teacher} />
                            <AvatarFallback>
                              {skill.teacher
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{skill.teacher}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3 mr-1" />
                              {skill.location}
                            </div>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{skill.rating}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {skill.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm" asChild>
                            <Link href={`/skills/${skill.id}`}>View Skill</Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Teachers Results */}
              <TabsContent value="teachers">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTeachers.map((teacher) => (
                    <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{teacher.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="w-3 h-3 mr-1" />
                              {teacher.location}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{teacher.bio}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {teacher.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center text-sm">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{teacher.rating}</span>
                                <span className="text-muted-foreground ml-1">({teacher.reviewCount} reviews)</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="w-4 h-4 mr-1" />
                                {teacher.studentsCount} students
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" asChild>
                                <Link href={`/profile/${teacher.id}`}>View Profile</Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* No Results */}
            {filteredSkills.length === 0 && filteredTeachers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => setQuery("")}>
                    Clear Search
                  </Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
