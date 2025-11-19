"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star, MapPin, Clock, BookOpen, Search, Filter, Grid3X3, List, MessageCircle, Heart, Users } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const categories = [
  "All Categories",
  "Technology",
  "Music",
  "Arts & Crafts",
  "Cooking",
  "Languages",
  "Health & Wellness",
]
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export default function BrowseSkillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [ratingFilter, setRatingFilter] = useState([0])

  const { data, error, isLoading } = useSWR(`/api/skills`, fetcher)

  const skillsFromApi =
    data?.skills?.map((s: any) => ({
      id: s.id,
      title: s.title,
      teacher: {
        name: s.teacher?.name,
        avatar: s.teacher?.avatar,
        location: s.teacher?.location,
        rating: s.teacher?.rating ?? 0,
        reviewCount: s.teacher?.reviewCount ?? 0,
      },
      description: s.description,
      category: s.category,
      level: "All Levels",
      duration: s.duration ?? "Flexible",
      price: "Skill Exchange",
      studentsCount: s.studentsCount ?? 0,
      image: s.image || "/skill-image.jpg",
      tags: s.tags ?? [],
      isOnline: s.isOnline ?? true,
      nextSession: s.nextSession ?? "Check availability",
    })) ?? []

  const filteredSkills = skillsFromApi.filter((skill: any) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All Categories" || skill.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || (skill.level || "").includes(selectedLevel)
    const matchesOnline = !onlineOnly || skill.isOnline
    const matchesRating = (skill.teacher?.rating ?? 0) >= ratingFilter[0]

    return matchesSearch && matchesCategory && matchesLevel && matchesOnline && matchesRating
  })

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
            <Link href="/browse" className="text-foreground font-medium">
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
            <Button asChild>
              <Link href="/teach">Teach a Skill</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Skills</h1>
          <p className="text-muted-foreground">
            Discover amazing skills to learn from passionate teachers in your community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search skills, teachers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Format</label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online-only"
                        checked={onlineOnly}
                        onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
                      />
                      <label htmlFor="online-only" className="text-sm">
                        Online sessions only
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Minimum Rating</label>
                    <div className="px-2">
                      <Slider
                        value={ratingFilter}
                        onValueChange={setRatingFilter}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>{ratingFilter[0].toFixed(1)}+ stars</span>
                        <span>5</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">View</label>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""} found
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="students">Most Students</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Skills Grid/List */}
        {isLoading && <div className="text-muted-foreground mb-6">Loading skills...</div>}
        {error && <div className="text-red-500 mb-6">Failed to load skills. Please try again.</div>}
        {!isLoading && !error && (
          <div>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                  <Card key={skill.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={skill.image || "/skill-image.jpg"}
                        alt={skill.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge variant="secondary" className="bg-background/90">
                          {skill.category}
                        </Badge>
                        {skill.isOnline && (
                          <Badge variant="default" className="bg-green-500">
                            Online
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-3 left-3 bg-background/90 hover:bg-background"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-1">{skill.title}</CardTitle>
                          <CardDescription className="line-clamp-2 mt-1">{skill.description}</CardDescription>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={skill.teacher.avatar || "/skill-image.jpg"}
                            alt={skill.teacher.name}
                          />
                          <AvatarFallback>
                            {skill.teacher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{skill.teacher.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 mr-1" />
                            {skill.teacher.location}
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{skill.teacher.rating}</span>
                          <span className="text-muted-foreground ml-1">({skill.teacher.reviewCount})</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {skill.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {skill.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {skill.studentsCount} students
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" asChild>
                          <Link href={`/skills/${skill.id}`}>Learn More</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSkills.map((skill) => (
                  <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={skill.image || "/skill-image.jpg"}
                            alt={skill.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{skill.title}</h3>
                              <p className="text-muted-foreground line-clamp-2">{skill.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="secondary">{skill.category}</Badge>
                              {skill.isOnline && <Badge className="bg-green-500">Online</Badge>}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={skill.teacher.avatar || "/skill-image.jpg"}
                                  alt={skill.teacher.name}
                                />
                                <AvatarFallback>
                                  {skill.teacher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{skill.teacher.name}</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {skill.teacher.location}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center text-sm">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="font-medium">{skill.teacher.rating}</span>
                              <span className="text-muted-foreground ml-1">({skill.teacher.reviewCount} reviews)</span>
                            </div>

                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="w-4 h-4 mr-1" />
                              {skill.studentsCount} students
                            </div>

                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              {skill.duration}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {skill.tags.slice(0, 4).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                              <Button asChild>
                                <Link href={`/skills/${skill.id}`}>Learn More</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No skills found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse different categories
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setSelectedLevel("All Levels")
                setOnlineOnly(false)
                setRatingFilter([0])
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
