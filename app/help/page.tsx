import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Search, MessageCircle, HelpCircle, Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
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
            <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
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
            Help & <span className="text-primary">Support</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team. We're here to help you succeed on
            your learning journey.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search for help articles..." className="pl-10 h-12 text-base" />
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Learn the basics of using SkillSwap and setting up your profile</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Finding Matches</CardTitle>
                <CardDescription>Tips for connecting with the right teachers and learners</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Solutions to common technical issues and problems</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Quick answers to the most common questions about SkillSwap</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">How do I get started on SkillSwap?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Getting started is easy! Simply sign up for a free account, complete your profile by adding the skills
                you want to learn and teach, and start browsing or get matched with other users. You can begin
                connecting with potential learning partners right away.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Is SkillSwap free to use?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! SkillSwap is completely free to use. You can create a profile, browse skills, connect with other
                users, and use our messaging and video calling features at no cost. We believe knowledge sharing should
                be accessible to everyone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">How does the matching system work?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our smart matching system uses AI to connect you with compatible learning partners based on your skills,
                location, availability, learning preferences, and goals. You'll receive match suggestions, or you can
                browse and search for skills manually.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What if I'm not satisfied with a learning session?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We want every learning experience to be positive. If you're not satisfied, you can provide feedback
                through our rating system, report issues to our support team, or simply find a different learning
                partner. We're here to help resolve any concerns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How do I ensure my safety when meeting other users?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Safety is our top priority. We recommend starting with video calls before meeting in person, meeting in
                public places, verifying profiles, and trusting your instincts. We also have reporting and blocking
                features, plus 24/7 support for any safety concerns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can I teach multiple skills or learn from multiple people?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can add multiple skills to your profile both as a learner and teacher. You can also connect with
                multiple learning partners simultaneously. There are no limits on how many skills you can exchange or
                people you can learn from.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">What technical requirements do I need?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                SkillSwap works on any modern web browser on desktop or mobile. For video calls, you'll need a camera
                and microphone. We recommend a stable internet connection for the best experience. No special software
                downloads are required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">How do I report inappropriate behavior?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can report inappropriate behavior directly through user profiles, in messages, or by contacting our
                support team. We take all reports seriously and will investigate promptly. We have zero tolerance for
                harassment, discrimination, or unsafe behavior.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-muted-foreground">
              Can't find what you're looking for? Get in touch with our support team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea placeholder="Please describe your question or issue in detail..." rows={5} />
                </div>
                <Button className="w-full">
                  Send Message <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <Mail className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Get help via email - we typically respond within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">For general questions, technical issues, or account help</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Email: [Leave blank - will be filled later]
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>Speak directly with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Available Monday-Friday, 9 AM - 6 PM EST</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Phone: [Leave blank - will be filled later]
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageCircle className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>Chat with us in real-time for immediate assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Available during business hours for urgent issues</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12 px-4">
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
