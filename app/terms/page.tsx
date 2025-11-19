import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Shield, Users, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            These terms govern your use of SkillSwap. By using our platform, you agree to these terms and conditions.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: December 2024</p>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">User Agreement</CardTitle>
                <CardDescription>Your rights and responsibilities as a SkillSwap user</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Safety Guidelines</CardTitle>
                <CardDescription>Rules to ensure a safe learning environment for everyone</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Community Standards</CardTitle>
                <CardDescription>Expected behavior and conduct within our community</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <AlertTriangle className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Limitations</CardTitle>
                <CardDescription>Important limitations and disclaimers about our service</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                By accessing or using SkillSwap, you agree to be bound by these Terms of Service and our Privacy Policy.
                If you do not agree to these terms, please do not use our platform.
              </p>
              <p className="mb-4">
                We may update these terms from time to time. Continued use of SkillSwap after changes are posted
                constitutes acceptance of the updated terms.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                SkillSwap is a platform that connects individuals who want to learn skills with those who can teach
                them. We provide tools for communication, scheduling, and progress tracking to facilitate skill
                exchanges.
              </p>
              <p className="mb-4">
                SkillSwap acts as a facilitator and is not responsible for the actual teaching, learning, or skill
                exchange activities between users.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">3. User Accounts and Registration</h2>
            <div className="mb-8 text-muted-foreground">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Account Creation</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>You must be at least 13 years old to create an account</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You may not create multiple accounts or share your account</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 text-foreground">Account Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep your login credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized account access</li>
                <li>Update your profile information to keep it current and accurate</li>
                <li>You are responsible for all activities that occur under your account</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4">4. User Conduct and Community Guidelines</h2>
            <div className="mb-8 text-muted-foreground">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Acceptable Use</h3>
              <p className="mb-4">You agree to use SkillSwap in a respectful and lawful manner. You may:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Create an honest and accurate profile</li>
                <li>Communicate respectfully with other users</li>
                <li>Share knowledge and skills in good faith</li>
                <li>Report inappropriate behavior or content</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 text-foreground">Prohibited Activities</h3>
              <p className="mb-4">You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Harass, threaten, or discriminate against other users</li>
                <li>Share false, misleading, or inappropriate content</li>
                <li>Use the platform for commercial purposes without permission</li>
                <li>Attempt to circumvent platform safety measures</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate others or create fake profiles</li>
                <li>Share personal contact information in public profiles</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4">5. Content and Intellectual Property</h2>
            <div className="mb-8 text-muted-foreground">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Your Content</h3>
              <p className="mb-4">
                You retain ownership of content you create and share on SkillSwap. By posting content, you grant us a
                license to use, display, and distribute it as necessary to provide our services.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">Platform Content</h3>
              <p className="mb-4">
                SkillSwap's platform, features, and content are protected by intellectual property laws. You may not
                copy, modify, or distribute our platform without permission.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">6. Safety and Security</h2>
            <div className="mb-8 text-muted-foreground">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Personal Safety</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Always prioritize your personal safety when meeting other users</li>
                <li>Meet in public places for in-person skill exchanges</li>
                <li>Trust your instincts and report suspicious behavior</li>
                <li>Do not share personal information like home address or financial details</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 text-foreground">Platform Security</h3>
              <p className="mb-4">
                We implement security measures to protect the platform, but you also play a role in maintaining security
                by using strong passwords and reporting security issues.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">7. Privacy and Data Protection</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
                protect your personal information.
              </p>
              <p className="mb-4">
                By using SkillSwap, you consent to the collection and use of your information as described in our
                Privacy Policy.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">8. Payments and Fees</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                SkillSwap is currently free to use. If we introduce paid features in the future, we will provide clear
                notice and obtain your consent before charging any fees.
              </p>
              <p className="mb-4">
                Any skill exchanges involving payment between users are private arrangements. SkillSwap is not
                responsible for payment disputes between users.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">9. Disclaimers and Limitations</h2>
            <div className="mb-8 text-muted-foreground">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Service Availability</h3>
              <p className="mb-4">
                We strive to keep SkillSwap available 24/7, but we cannot guarantee uninterrupted service. We may
                temporarily suspend service for maintenance or updates.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">User Interactions</h3>
              <p className="mb-4">
                SkillSwap facilitates connections between users but is not responsible for the quality, safety, or
                outcomes of skill exchanges. Users interact at their own risk.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">Limitation of Liability</h3>
              <p className="mb-4">
                To the maximum extent permitted by law, SkillSwap shall not be liable for any indirect, incidental, or
                consequential damages arising from your use of the platform.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                You may terminate your account at any time by contacting us or using account deletion features. We may
                suspend or terminate accounts that violate these terms.
              </p>
              <p className="mb-4">
                Upon termination, your access to SkillSwap will cease, but these terms will continue to apply to your
                past use of the platform.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                These terms are governed by the laws of [Jurisdiction to be added]. Any disputes will be resolved in the
                courts of [Jurisdiction to be added].
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">If you have questions about these Terms of Service, please contact us:</p>
              <ul className="list-none space-y-2">
                <li>
                  <strong>Email:</strong> [Legal email to be added]
                </li>
                <li>
                  <strong>Address:</strong> [Company address to be added]
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Now that you understand our terms, join thousands of learners and teachers on SkillSwap to start your
            learning journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Create Account <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
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
