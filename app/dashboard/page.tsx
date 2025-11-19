"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
  Clock,
  Award,
  Plus,
  ArrowRight,
  Bell,
  Settings,
  Search,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
            <Link href="/dashboard" className="text-foreground font-medium">
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
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/professional-woman-headshot.png" alt="Sarah Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">Here's what's happening with your learning and teaching journey.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Students Taught</p>
                  <p className="text-2xl font-bold">245</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12 this month
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
                  <p className="text-sm text-muted-foreground">Skills Learning</p>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <BookOpen className="w-3 h-3 mr-1" />2 in progress
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
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <Star className="w-3 h-3 mr-1" />
                    127 reviews
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours This Week</p>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />6 sessions
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Sessions */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>Your next teaching and learning sessions</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Calendar
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        type: "teaching",
                        title: "Web Development - React Hooks",
                        student: "David Kim",
                        time: "Tomorrow, 2:00 PM",
                        duration: "2 hours",
                        avatar: "/professional-man-headshot.png",
                      },
                      {
                        type: "learning",
                        title: "Spanish Conversation Practice",
                        teacher: "Maria Garcia",
                        time: "Tomorrow, 4:30 PM",
                        duration: "1 hour",
                        avatar: "/professional-woman-headshot.png",
                      },
                      {
                        type: "teaching",
                        title: "Photography - Portrait Lighting",
                        student: "Emma Wilson",
                        time: "Friday, 6:00 PM",
                        duration: "1.5 hours",
                        avatar: "/professional-woman-headshot.png",
                      },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={session.avatar || "/placeholder.svg"} alt="" />
                            <AvatarFallback>
                              {(session.student || session.teacher || "")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{session.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {session.type === "teaching"
                                ? `Teaching ${session.student}`
                                : `Learning from ${session.teacher}`}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {session.time} • {session.duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={session.type === "teaching" ? "default" : "secondary"}>
                            {session.type === "teaching" ? "Teaching" : "Learning"}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" asChild>
                      <Link href="/teach">
                        <Plus className="w-4 h-4 mr-2" />
                        Teach a New Skill
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/browse">
                        <Search className="w-4 h-4 mr-2" />
                        Find Skills to Learn
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/messages">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Check Messages
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/profile">
                        <Settings className="w-4 h-4 mr-2" />
                        Update Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">New student enrolled</p>
                      <p className="text-muted-foreground">Alex joined your Web Development course</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Session completed</p>
                      <p className="text-muted-foreground">Spanish lesson with Maria Garcia</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">New review received</p>
                      <p className="text-muted-foreground">5-star review for Photography course</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your progress in current learning journeys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      skill: "Spanish Conversation",
                      teacher: "Maria Garcia",
                      progress: 65,
                      nextSession: "Tomorrow, 4:30 PM",
                      totalSessions: 20,
                      completedSessions: 13,
                    },
                    {
                      skill: "UI/UX Design",
                      teacher: "Alex Johnson",
                      progress: 40,
                      nextSession: "Friday, 10:00 AM",
                      totalSessions: 15,
                      completedSessions: 6,
                    },
                  ].map((course, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{course.skill}</h4>
                          <p className="text-sm text-muted-foreground">with {course.teacher}</p>
                        </div>
                        <Badge variant="outline">{course.progress}%</Badge>
                      </div>
                      <Progress value={course.progress} className="mb-3" />
                      <div className="flex justify-between text-sm text-muted-foreground mb-3">
                        <span>
                          {course.completedSessions}/{course.totalSessions} sessions
                        </span>
                        <span>Next: {course.nextSession}</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Continue Learning
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teaching Tab */}
          <TabsContent value="teaching" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Your Teaching Skills</CardTitle>
                      <CardDescription>Manage your courses and students</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/teach">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Skill
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        title: "Full-Stack Web Development",
                        students: 89,
                        rating: 4.9,
                        reviews: 127,
                        earnings: "45 skill credits",
                        status: "Active",
                      },
                      {
                        title: "React & Next.js Masterclass",
                        students: 67,
                        rating: 4.8,
                        reviews: 89,
                        earnings: "32 skill credits",
                        status: "Active",
                      },
                      {
                        title: "Portrait Photography",
                        students: 23,
                        rating: 4.7,
                        reviews: 34,
                        earnings: "18 skill credits",
                        status: "Active",
                      },
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{skill.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{skill.students} students</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 mr-1" />
                              {skill.rating} ({skill.reviews} reviews)
                            </div>
                            <span>{skill.earnings}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{skill.status}</Badge>
                          <Button size="sm" variant="ghost">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Student Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        student: "David Kim",
                        action: "Completed Week 4: React Components",
                        course: "Web Development",
                        time: "2 hours ago",
                      },
                      {
                        student: "Emma Wilson",
                        action: "Left a 5-star review",
                        course: "Photography",
                        time: "5 hours ago",
                      },
                      {
                        student: "Michael Brown",
                        action: "Enrolled in course",
                        course: "React Masterclass",
                        time: "1 day ago",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {activity.student
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{activity.student}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.action} • {activity.course}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Teaching Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Students</span>
                      <span className="font-medium">245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Rating</span>
                      <span className="font-medium">4.9/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Skill Credits Earned</span>
                      <span className="font-medium">95</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Top Teacher</p>
                        <p className="text-xs text-muted-foreground">4.8+ rating with 100+ students</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Community Builder</p>
                        <p className="text-xs text-muted-foreground">Helped 200+ students learn</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Current Learning</CardTitle>
                      <CardDescription>Your active learning journeys</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/browse">
                        <Search className="w-4 h-4 mr-2" />
                        Find New Skills
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        skill: "Spanish Conversation",
                        teacher: "Maria Garcia",
                        progress: 65,
                        nextSession: "Tomorrow, 4:30 PM",
                        totalHours: 40,
                        completedHours: 26,
                      },
                      {
                        skill: "UI/UX Design Fundamentals",
                        teacher: "Alex Johnson",
                        progress: 40,
                        nextSession: "Friday, 10:00 AM",
                        totalHours: 30,
                        completedHours: 12,
                      },
                    ].map((course, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{course.skill}</h4>
                              <p className="text-sm text-muted-foreground">with {course.teacher}</p>
                            </div>
                            <Badge variant="outline">{course.progress}%</Badge>
                          </div>
                          <Progress value={course.progress} className="mb-3" />
                          <div className="flex justify-between text-sm text-muted-foreground mb-3">
                            <span>
                              {course.completedHours}/{course.totalHours} hours
                            </span>
                            <span>Next: {course.nextSession}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              Continue Learning
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning History</CardTitle>
                    <CardDescription>Completed courses and achievements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        skill: "Advanced React Patterns",
                        teacher: "John Smith",
                        completed: "3 months ago",
                        rating: 5,
                        certificate: true,
                      },
                      {
                        skill: "Digital Photography Basics",
                        teacher: "Lisa Chen",
                        completed: "6 months ago",
                        rating: 4,
                        certificate: true,
                      },
                      {
                        skill: "Italian Conversation",
                        teacher: "Marco Rossi",
                        completed: "1 year ago",
                        rating: 5,
                        certificate: false,
                      },
                    ].map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{course.skill}</h4>
                          <p className="text-sm text-muted-foreground">
                            with {course.teacher} • Completed {course.completed}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="flex mr-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < course.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            {course.certificate && (
                              <Badge variant="secondary" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                Certified
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          View Certificate
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Complete Spanish Course</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Master UI/UX Design</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Learn Guitar Basics</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Credits</CardTitle>
                    <CardDescription>Credits earned from teaching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-primary">95</div>
                      <div className="text-sm text-muted-foreground">Available Credits</div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/browse">
                        Use Credits to Learn
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Stay connected with your learning community</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/messages">
                    View All Messages
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "David Kim",
                    message: "Thanks for the great React lesson! I have a question about hooks...",
                    time: "2 hours ago",
                    unread: true,
                    avatar: "/professional-man-headshot.png",
                  },
                  {
                    name: "Maria Garcia",
                    message: "¡Hola! Ready for our Spanish session tomorrow?",
                    time: "5 hours ago",
                    unread: true,
                    avatar: "/professional-woman-headshot.png",
                  },
                  {
                    name: "Emma Wilson",
                    message: "The photography tips you shared were amazing! Here are my practice shots...",
                    time: "1 day ago",
                    unread: false,
                    avatar: "/professional-woman-headshot.png",
                  },
                  {
                    name: "Alex Johnson",
                    message: "Can we reschedule Friday's UI/UX session?",
                    time: "2 days ago",
                    unread: false,
                    avatar: "/professional-asian-man-headshot.png",
                  },
                ].map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer ${
                      message.unread ? "bg-primary/5 border-primary/20" : ""
                    }`}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.name} />
                      <AvatarFallback>
                        {message.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                          {message.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                    </div>
                    {message.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
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
