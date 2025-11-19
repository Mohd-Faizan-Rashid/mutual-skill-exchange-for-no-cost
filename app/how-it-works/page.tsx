import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, MessageCircle, Users, Video, Star, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SkillSwap</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse Skills
            </Link>
            <Link href="/how-it-works" className="text-foreground font-medium">
              How It Works
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            How <span className="text-primary">SkillSwap</span> Works
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Learn any skill or teach what you know in just a few simple steps. Join thousands who are already growing
            together.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <Card className="text-center relative">
              <CardHeader>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <CardTitle className="text-2xl mb-4">Find Skills</CardTitle>
                <CardDescription className="text-base">
                  Browse through hundreds of skills or search for exactly what you want to learn. Filter by location,
                  skill level, and availability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center relative">
              <CardHeader>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <CardTitle className="text-2xl mb-4">Connect & Match</CardTitle>
                <CardDescription className="text-base">
                  Send messages to skilled teachers or get matched automatically. Discuss learning goals, schedules, and
                  exchange preferences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center relative">
              <CardHeader>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <CardTitle className="text-2xl mb-4">Learn & Teach</CardTitle>
                <CardDescription className="text-base">
                  Start your skill exchange sessions via video calls or in-person meetings. Track progress and build
                  lasting learning relationships.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Complete Process</h2>
            <p className="text-xl text-muted-foreground">
              A detailed look at your journey from signup to skill mastery
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1 Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Step 1</Badge>
                <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Sign up and tell us about yourself. List the skills you want to learn and the skills you can teach.
                  Add your location, availability, and learning preferences.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Add skills you want to learn</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>List skills you can teach</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Set your availability and preferences</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img src="/laptop-profile-creation.png" alt="Creating profile" className="rounded-lg shadow-lg" />
              </div>
            </div>

            {/* Step 2 Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <img src="/people-browsing-skills-on-mobile-app.jpg" alt="Browsing skills" className="rounded-lg shadow-lg" />
              </div>
              <div className="order-1 lg:order-2">
                <Badge className="mb-4">Step 2</Badge>
                <h3 className="text-2xl font-bold mb-4">Discover & Connect</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Browse skills in your area or use our smart matching system. Send messages to potential teachers or
                  respond to learning requests from others.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Browse skills by category or location</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Get smart matches based on your profile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Message potential learning partners</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Step 3</Badge>
                <h3 className="text-2xl font-bold mb-4">Start Learning</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Schedule your first session and begin your skill exchange journey. Use our built-in video calling or
                  meet in person. Track your progress and celebrate milestones.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Schedule sessions that work for both parties</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Use built-in video calling or meet in person</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Track progress and earn achievements</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img src="/people-learning-together-via-video-call.jpg" alt="Learning session" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for successful skill exchanges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Video className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Built-in Video Calls</CardTitle>
                <CardDescription>
                  High-quality video calling with screen sharing and recording capabilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered matching based on skills, location, availability, and learning style
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Star className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Track your learning journey with milestones, achievements, and skill assessments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Secure Messaging</CardTitle>
                <CardDescription>
                  Safe and secure communication with built-in translation and scheduling tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Verified Profiles</CardTitle>
                <CardDescription>
                  Identity verification and skill validation for trusted learning experiences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Access to shared materials, notes, and resources from your learning sessions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers who are already growing together on SkillSwap. Your next skill is
            just a conversation away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/signup">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/browse">Browse Skills</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SkillSwap</span>
              </div>
              <p className="text-muted-foreground">
                Connecting learners and teachers to build a better world through shared knowledge.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/browse" className="hover:text-foreground transition-colors">
                    Browse Skills
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
