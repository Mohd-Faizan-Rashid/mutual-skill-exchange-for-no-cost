"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  BookOpen,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Filter,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react"
import Link from "next/link"

const reviewsData = [
  {
    id: 1,
    reviewer: {
      name: "David Kim",
      avatar: "/professional-man-headshot.png",
      level: "Beginner",
      joinDate: "March 2024",
    },
    skill: {
      title: "Full-Stack Web Development",
      teacher: "Sarah Chen",
      id: 1,
    },
    rating: 5,
    date: "2 weeks ago",
    content:
      "Sarah is an incredible teacher! She explained complex React concepts in a way that was easy to understand. Her patience and encouragement helped me build my first full-stack application. The course structure was perfect, starting with basics and gradually building up to advanced topics. I now feel confident applying for junior developer positions.",
    helpful: 24,
    notHelpful: 2,
    verified: true,
    tags: ["Great Teacher", "Clear Explanations", "Practical Projects"],
  },
  {
    id: 2,
    reviewer: {
      name: "Emma Wilson",
      avatar: "/professional-woman-headshot.png",
      level: "Intermediate",
      joinDate: "January 2024",
    },
    skill: {
      title: "Acoustic Guitar for Beginners",
      teacher: "Mike Rodriguez",
      id: 2,
    },
    rating: 5,
    date: "1 month ago",
    content:
      "Mike's guitar lessons exceeded my expectations. His teaching method is very systematic and he provides excellent feedback on technique. I went from knowing nothing about guitar to playing my first song in just 4 weeks. The practice materials and song selections were perfect for beginners.",
    helpful: 18,
    notHelpful: 1,
    verified: true,
    tags: ["Systematic Approach", "Great Feedback", "Beginner Friendly"],
  },
  {
    id: 3,
    reviewer: {
      name: "Michael Brown",
      avatar: "/professional-man-headshot.png",
      level: "Advanced",
      joinDate: "November 2023",
    },
    skill: {
      title: "Portrait Photography Masterclass",
      teacher: "Emma Wilson",
      id: 3,
    },
    rating: 4,
    date: "2 months ago",
    content:
      "Great photography course with excellent technical content. Emma's expertise in lighting and composition really shows. The hands-on practice sessions were invaluable. My only suggestion would be to include more post-processing techniques, but overall a solid course that improved my portrait skills significantly.",
    helpful: 15,
    notHelpful: 3,
    verified: true,
    tags: ["Technical Excellence", "Hands-on Practice", "Professional Tips"],
  },
  {
    id: 4,
    reviewer: {
      name: "Lisa Chen",
      avatar: "/professional-woman-headshot.png",
      level: "Beginner",
      joinDate: "February 2024",
    },
    skill: {
      title: "Spanish Conversation Practice",
      teacher: "Maria Garcia",
      id: 4,
    },
    rating: 5,
    date: "3 weeks ago",
    content:
      "Maria creates such a comfortable learning environment! As someone who was nervous about speaking Spanish, she made me feel at ease from day one. Her conversation topics are engaging and relevant to real-life situations. My confidence in speaking Spanish has improved dramatically.",
    helpful: 21,
    notHelpful: 0,
    verified: true,
    tags: ["Comfortable Environment", "Confidence Building", "Real-life Practice"],
  },
  {
    id: 5,
    reviewer: {
      name: "James Park",
      avatar: "/professional-asian-man-headshot.png",
      level: "Intermediate",
      joinDate: "December 2023",
    },
    skill: {
      title: "Italian Cooking Fundamentals",
      teacher: "Marco Rossi",
      id: 5,
    },
    rating: 4,
    date: "1 month ago",
    content:
      "Authentic Italian cooking techniques taught by someone who really knows the cuisine. Marco's passion for cooking is infectious and his family recipes are amazing. The hands-on approach in his kitchen was perfect. Would love to see more advanced techniques in future sessions.",
    helpful: 12,
    notHelpful: 1,
    verified: true,
    tags: ["Authentic Recipes", "Passionate Teacher", "Hands-on Learning"],
  },
]

const skillStats = {
  totalReviews: 127,
  averageRating: 4.9,
  ratingDistribution: {
    5: 85,
    4: 12,
    3: 2,
    2: 1,
    1: 0,
  },
}

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredReviews = reviewsData.filter((review) => {
    if (selectedRating !== "all" && review.rating !== Number.parseInt(selectedRating)) {
      return false
    }
    return true
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Reviews</h1>
          <p className="text-muted-foreground">
            Read authentic reviews from learners and discover the best skills and teachers on SkillSwap.
          </p>
        </div>

        <Tabs defaultValue="all-reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          {/* All Reviews Tab */}
          <TabsContent value="all-reviews" className="space-y-6">
            {/* Filters and Sorting */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Filter by rating:</span>
                    </div>
                    <Select value={selectedRating} onValueChange={setSelectedRating}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="text-sm font-medium">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                        <SelectItem value="helpful">Most Helpful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} alt={review.reviewer.name} />
                        <AvatarFallback>
                          {review.reviewer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{review.reviewer.name}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {review.reviewer.level}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Member since {review.reviewer.joinDate} • {review.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">Reviewed:</span>
                            <Link
                              href={`/skills/${review.skill.id}`}
                              className="text-sm text-primary hover:underline font-medium"
                            >
                              {review.skill.title}
                            </Link>
                            <span className="text-sm text-muted-foreground">by {review.skill.teacher}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">{review.content}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {review.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Helpful ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <ThumbsDown className="w-4 h-4 mr-1" />({review.notHelpful})
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Top Rated Tab */}
          <TabsContent value="top-rated" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Rating Overview</CardTitle>
                  <CardDescription>Community ratings across all skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">{skillStats.averageRating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-muted-foreground">Based on {skillStats.totalReviews} reviews</div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-sm w-3">{stars}</span>
                        <Star className="w-3 h-3 text-yellow-400" />
                        <Progress
                          value={skillStats.ratingDistribution[stars as keyof typeof skillStats.ratingDistribution]}
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-muted-foreground w-8">
                          {skillStats.ratingDistribution[stars as keyof typeof skillStats.ratingDistribution]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                {sortedReviews
                  .filter((review) => review.rating === 5)
                  .slice(0, 3)
                  .map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={review.reviewer.avatar || "/placeholder.svg"}
                              alt={review.reviewer.name}
                            />
                            <AvatarFallback>
                              {review.reviewer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-medium">{review.reviewer.name}</h4>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-2 line-clamp-3">{review.content}</p>
                            <Link
                              href={`/skills/${review.skill.id}`}
                              className="text-sm text-primary hover:underline font-medium"
                            >
                              {review.skill.title}
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Recent Tab */}
          <TabsContent value="recent" className="space-y-6">
            <div className="space-y-4">
              {sortedReviews.slice(0, 5).map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} alt={review.reviewer.name} />
                        <AvatarFallback>
                          {review.reviewer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{review.reviewer.name}</h4>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {review.date}
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.content}</p>
                        <Link
                          href={`/skills/${review.skill.id}`}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {review.skill.title} by {review.skill.teacher}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Most Helpful Reviews This Week
                </CardTitle>
                <CardDescription>Reviews that the community found most valuable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedReviews
                    .sort((a, b) => b.helpful - a.helpful)
                    .slice(0, 3)
                    .map((review, index) => (
                      <div key={review.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} alt={review.reviewer.name} />
                          <AvatarFallback>
                            {review.reviewer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{review.reviewer.name}</h4>
                              <div className="text-sm text-muted-foreground">{review.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                {review.helpful}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2 line-clamp-2">{review.content}</p>
                          <Link
                            href={`/skills/${review.skill.id}`}
                            className="text-sm text-primary hover:underline font-medium"
                          >
                            {review.skill.title}
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
