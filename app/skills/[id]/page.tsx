import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MapPin,
  Clock,
  Users,
  BookOpen,
  MessageCircle,
  Heart,
  Share2,
  Calendar,
  CheckCircle,
  PlayCircle,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function SkillDetailPage() {
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
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Skill Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <img
                src="/web-development-coding.png"
                alt="Full-Stack Web Development"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">Technology</Badge>
              <Badge className="bg-green-500">Online</Badge>
              <Badge variant="outline">Beginner to Advanced</Badge>
            </div>

            <h1 className="text-3xl font-bold mb-4">Full-Stack Web Development</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Master modern web development with React, Node.js, and databases. This comprehensive course takes you from
              beginner to advanced, covering everything you need to build professional web applications.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                12 weeks duration
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                89 students enrolled
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Next session: Tomorrow, 2:00 PM
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "JavaScript", "MongoDB", "Express", "CSS", "HTML", "Git"].map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Teacher Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Teacher</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/professional-woman-headshot.png" alt="Sarah Chen" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Sarah Chen</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">4.9</span>
                      <span className="text-muted-foreground ml-1">(127 reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Full-stack developer with 8+ years of experience. Passionate about teaching and helping others break
                  into tech.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/profile">View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enrollment Card */}
            <Card>
              <CardHeader>
                <CardTitle>Join This Skill</CardTitle>
                <CardDescription>Start learning with Sarah today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">Skill Exchange</div>
                    <div className="text-sm text-muted-foreground">Trade your skills to learn</div>
                  </div>
                  <Button className="w-full" size="lg">
                    Request to Join
                  </Button>
                  <div className="text-xs text-muted-foreground text-center">
                    You'll need to offer a skill in exchange
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="font-medium">4.9/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-medium">245</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <Tabs defaultValue="curriculum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>12 weeks of comprehensive web development training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      week: 1,
                      title: "HTML & CSS Fundamentals",
                      lessons: 5,
                      duration: "6 hours",
                      completed: true,
                    },
                    {
                      week: 2,
                      title: "JavaScript Basics",
                      lessons: 6,
                      duration: "8 hours",
                      completed: true,
                    },
                    {
                      week: 3,
                      title: "DOM Manipulation & Events",
                      lessons: 4,
                      duration: "5 hours",
                      completed: false,
                    },
                    {
                      week: 4,
                      title: "Introduction to React",
                      lessons: 7,
                      duration: "10 hours",
                      completed: false,
                    },
                    {
                      week: 5,
                      title: "React Components & Props",
                      lessons: 6,
                      duration: "8 hours",
                      completed: false,
                    },
                    {
                      week: 6,
                      title: "State Management & Hooks",
                      lessons: 8,
                      duration: "12 hours",
                      completed: false,
                    },
                  ].map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                          {module.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Week {module.week}: {module.title}
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            {module.lessons} lessons • {module.duration}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {module.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">4.9</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-muted-foreground">127 reviews</div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-sm w-3">{stars}</span>
                        <Star className="w-3 h-3 text-yellow-400" />
                        <Progress value={stars === 5 ? 85 : stars === 4 ? 12 : 3} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground w-8">
                          {stars === 5 ? "85%" : stars === 4 ? "12%" : "3%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                {[
                  {
                    name: "David Kim",
                    rating: 5,
                    date: "2 weeks ago",
                    content:
                      "Incredible course! Sarah's teaching style is perfect for beginners. The projects were challenging but achievable, and I now feel confident building full-stack applications.",
                  },
                  {
                    name: "Emma Wilson",
                    rating: 5,
                    date: "1 month ago",
                    content:
                      "Best web development course I've taken. Sarah explains complex concepts clearly and provides excellent support throughout the learning journey.",
                  },
                  {
                    name: "Michael Brown",
                    rating: 4,
                    date: "2 months ago",
                    content:
                      "Great course content and structure. Would have liked more advanced topics, but perfect for getting started with modern web development.",
                  },
                ].map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                  <CardDescription>What you need before starting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Basic computer literacy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Willingness to learn and practice</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>No prior programming experience required</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                  <CardDescription>Skills you'll gain from this course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Build responsive web applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Master React and modern JavaScript</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Create RESTful APIs with Node.js</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Work with databases and authentication</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Deploy applications to production</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    question: "How does skill exchange work?",
                    answer:
                      "You offer one of your skills in exchange for learning this skill. Sarah will review your profile and the skill you're offering to determine if it's a good match.",
                  },
                  {
                    question: "What if I don't have a skill to offer?",
                    answer:
                      "Everyone has something valuable to share! It could be a hobby, professional skill, language, or even life experience. We'll help you identify what you can teach.",
                  },
                  {
                    question: "How long are the sessions?",
                    answer:
                      "Sessions are typically 1-2 hours long, scheduled based on mutual availability. The course spans 12 weeks with 2-3 sessions per week.",
                  },
                  {
                    question: "Is this course suitable for complete beginners?",
                    answer:
                      "This course is designed to take you from zero programming knowledge to building full-stack applications. Sarah is experienced in teaching beginners.",
                  },
                  {
                    question: "What happens if I need to miss a session?",
                    answer:
                      "Sessions can be rescheduled with 24-hour notice. Sarah also provides recorded materials and notes for any missed content.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
