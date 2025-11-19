"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Star,
  MapPin,
  MessageCircle,
  Heart,
  X,
  Search,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const potentialMatches = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/professional-man-headshot.png",
    location: "Seattle, WA",
    rating: 4.8,
    reviewCount: 67,
    matchScore: 95,
    skillOffered: "UI/UX Design",
    skillWanted: "Web Development",
    bio: "Senior UX designer with 6 years of experience. Looking to learn full-stack development to better collaborate with engineering teams.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    availability: "Evenings & Weekends",
    responseTime: "Usually responds within 2 hours",
    mutualConnections: 3,
    isOnline: true,
  },
  {
    id: 2,
    name: "Maria Santos",
    avatar: "/professional-woman-headshot.png",
    location: "Austin, TX",
    rating: 4.9,
    reviewCount: 89,
    matchScore: 92,
    skillOffered: "Spanish Language",
    skillWanted: "Photography",
    bio: "Native Spanish speaker and language teacher. Passionate about learning portrait photography to capture beautiful moments with my family.",
    tags: ["Conversation", "Grammar", "Culture", "Business Spanish"],
    availability: "Flexible schedule",
    responseTime: "Usually responds within 1 hour",
    mutualConnections: 5,
    isOnline: false,
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/professional-asian-man-headshot.png",
    location: "San Francisco, CA",
    rating: 4.7,
    reviewCount: 45,
    matchScore: 88,
    skillOffered: "Data Science",
    skillWanted: "Guitar",
    bio: "Data scientist at a tech startup. Want to learn guitar as a creative outlet and stress relief from my analytical work.",
    tags: ["Python", "Machine Learning", "Statistics", "Visualization"],
    availability: "Weekends only",
    responseTime: "Usually responds within 4 hours",
    mutualConnections: 2,
    isOnline: true,
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    avatar: "/professional-woman-headshot.png",
    location: "Miami, FL",
    rating: 5.0,
    reviewCount: 34,
    matchScore: 85,
    skillOffered: "Digital Marketing",
    skillWanted: "Cooking",
    bio: "Marketing professional specializing in social media and content creation. Looking to learn cooking to improve my lifestyle and health.",
    tags: ["Social Media", "Content Strategy", "SEO", "Analytics"],
    availability: "Evenings",
    responseTime: "Usually responds within 3 hours",
    mutualConnections: 1,
    isOnline: true,
  },
]

const activeMatches = [
  {
    id: 1,
    name: "Lisa Thompson",
    avatar: "/professional-woman-headshot.png",
    skillExchange: "Yoga ↔ Web Development",
    status: "Active",
    nextSession: "Tomorrow, 7:00 AM",
    sessionsCompleted: 8,
    totalSessions: 16,
    startDate: "2 months ago",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    avatar: "/professional-man-headshot.png",
    skillExchange: "Guitar ↔ Photography",
    status: "Active",
    nextSession: "Friday, 6:00 PM",
    sessionsCompleted: 5,
    totalSessions: 12,
    startDate: "1 month ago",
    rating: 4.8,
  },
  {
    id: 3,
    name: "James Park",
    avatar: "/professional-asian-man-headshot.png",
    skillExchange: "Cooking ↔ JavaScript",
    status: "Completed",
    nextSession: null,
    sessionsCompleted: 10,
    totalSessions: 10,
    startDate: "4 months ago",
    rating: 4.7,
  },
]

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")
  const [skillFilter, setSkillFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredMatches = potentialMatches.filter((match) => {
    const matchesSearch =
      match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.skillOffered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.bio.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSkill = skillFilter === "all" || match.skillOffered.toLowerCase().includes(skillFilter.toLowerCase())

    return matchesSearch && matchesSkill
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
            <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse Skills
            </Link>
            <Link href="/matches" className="text-foreground font-medium">
              Matches
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Skill Matches</h1>
          <p className="text-muted-foreground">
            Discover perfect learning partners and manage your skill exchange relationships
          </p>
        </div>

        {/* Match Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Matches</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Exchanges</p>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    In progress
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Success rate: 100%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Match Score</p>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Star className="w-3 h-3 mr-1" />
                    Average compatibility
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">Discover Matches</TabsTrigger>
            <TabsTrigger value="active">Active Exchanges</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          {/* Discover Matches Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by name, skill, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={skillFilter} onValueChange={setSkillFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="language">Languages</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="cooking">Cooking</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="local">Within 25 miles</SelectItem>
                      <SelectItem value="remote">Remote only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Match Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                            <AvatarFallback>
                              {match.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {match.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{match.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3 mr-1" />
                            {match.location}
                          </div>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{match.rating}</span>
                            <span className="text-muted-foreground ml-1">({match.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {match.matchScore}% match
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Skill Exchange */}
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Offers: {match.skillOffered}
                          </Badge>
                          <span className="text-muted-foreground">↔</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Wants: {match.skillWanted}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground line-clamp-3">{match.bio}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {match.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {match.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{match.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Match Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <p className="font-medium">Availability</p>
                        <p>{match.availability}</p>
                      </div>
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p>{match.responseTime}</p>
                      </div>
                    </div>

                    {match.mutualConnections > 0 && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="w-3 h-3 mr-1" />
                        {match.mutualConnections} mutual connections
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No matches found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSkillFilter("all")
                    setLocationFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Active Exchanges Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                          <AvatarFallback>
                            {match.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{match.name}</h3>
                          <p className="text-sm text-muted-foreground">{match.skillExchange}</p>
                        </div>
                      </div>
                      <Badge variant={match.status === "Active" ? "default" : "secondary"}>{match.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {match.sessionsCompleted}/{match.totalSessions} sessions
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(match.sessionsCompleted / match.totalSessions) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Started</p>
                        <p className="font-medium">{match.startDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rating</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{match.rating}</span>
                        </div>
                      </div>
                    </div>

                    {match.nextSession && (
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary">Next Session</p>
                        <p className="text-sm text-muted-foreground">{match.nextSession}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button className="flex-1" variant={match.status === "Active" ? "default" : "outline"}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {match.status === "Active" ? "Message" : "View Details"}
                      </Button>
                      {match.status === "Active" && (
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Incoming Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Incoming Requests (3)
                  </CardTitle>
                  <CardDescription>People who want to connect with you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "John Smith",
                      avatar: "/professional-man-headshot.png",
                      skillOffered: "Graphic Design",
                      skillWanted: "Web Development",
                      message: "Hi Sarah! I'd love to learn React from you in exchange for design skills.",
                      time: "2 hours ago",
                    },
                    {
                      name: "Lisa Wang",
                      avatar: "/professional-woman-headshot.png",
                      skillOffered: "Mandarin",
                      skillWanted: "Photography",
                      message: "Hello! I'm a native Mandarin speaker interested in learning portrait photography.",
                      time: "1 day ago",
                    },
                    {
                      name: "Carlos Rodriguez",
                      avatar: "/professional-man-headshot.png",
                      skillOffered: "Salsa Dancing",
                      skillWanted: "JavaScript",
                      message: "¡Hola! I teach salsa and would love to learn programming from you.",
                      time: "2 days ago",
                    },
                  ].map((request, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                          <AvatarFallback>
                            {request.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{request.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Badge variant="outline" className="text-xs">
                              Offers: {request.skillOffered}
                            </Badge>
                            <span>→</span>
                            <Badge variant="outline" className="text-xs">
                              Wants: {request.skillWanted}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                          <p className="text-xs text-muted-foreground">{request.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Decline
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Outgoing Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Sent Requests (2)
                  </CardTitle>
                  <CardDescription>Requests you've sent to others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Maria Garcia",
                      avatar: "/professional-woman-headshot.png",
                      skillOffered: "Web Development",
                      skillWanted: "Spanish",
                      status: "Pending",
                      time: "3 hours ago",
                    },
                    {
                      name: "Alex Johnson",
                      avatar: "/professional-man-headshot.png",
                      skillOffered: "Photography",
                      skillWanted: "UI/UX Design",
                      status: "Viewed",
                      time: "1 day ago",
                    },
                  ].map((request, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                            <AvatarFallback>
                              {request.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{request.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                Your: {request.skillOffered}
                              </Badge>
                              <span>→</span>
                              <Badge variant="outline" className="text-xs">
                                Their: {request.skillWanted}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Badge variant={request.status === "Pending" ? "secondary" : "outline"}>{request.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Sent {request.time}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
