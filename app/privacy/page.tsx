import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Shield, Eye, Lock, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal
            information on SkillSwap.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: December 2024</p>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Data Protection</CardTitle>
                <CardDescription>We use industry-standard security measures to protect your data</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Transparency</CardTitle>
                <CardDescription>Clear information about what data we collect and why</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Your Control</CardTitle>
                <CardDescription>You control your data and can update or delete it anytime</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">No Selling</CardTitle>
                <CardDescription>We never sell your personal information to third parties</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <div className="mb-8 text-muted-foreground">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Personal Information</h3>
              <p className="mb-4">
                When you create an account, we collect information such as your name, email address, profile picture,
                and the skills you want to learn or teach. This information helps us create your profile and connect you
                with suitable learning partners.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">Usage Information</h3>
              <p className="mb-4">
                We collect information about how you use SkillSwap, including your interactions with other users, the
                skills you browse, and your learning progress. This helps us improve our matching algorithm and platform
                features.
              </p>

              <h3 className="text-lg font-semibold mb-3 text-foreground">Communication Data</h3>
              <p className="mb-4">
                Messages, video calls, and other communications through our platform are processed to provide the
                service. We may store message history to help you maintain your learning relationships.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <div className="mb-8 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>To create and maintain your SkillSwap profile</li>
                <li>To match you with compatible learning partners</li>
                <li>To facilitate communication between users</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To improve our platform and develop new features</li>
                <li>To send important updates about your account or our service</li>
                <li>To ensure platform safety and prevent misuse</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                We do not sell, rent, or trade your personal information. We only share your information in the
                following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>With other users:</strong> Your profile information is visible to help others find and connect
                  with you
                </li>
                <li>
                  <strong>Service providers:</strong> We work with trusted third-party services for hosting, analytics,
                  and customer support
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose information if required by law or to protect our
                  users' safety
                </li>
                <li>
                  <strong>Business transfers:</strong> In the event of a merger or acquisition, user data may be
                  transferred
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure data centers with physical security measures</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4">5. Your Rights and Choices</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">You have several rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of the personal information we have about you
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccurate information in your profile
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your account and associated data
                </li>
                <li>
                  <strong>Portability:</strong> Request your data in a machine-readable format
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing communications
                </li>
                <li>
                  <strong>Restriction:</strong> Limit how we process your information
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience on SkillSwap. These help us remember
                your preferences, analyze site usage, and provide personalized content.
              </p>
              <p className="mb-4">
                You can control cookie settings through your browser, but some features may not work properly if cookies
                are disabled.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                SkillSwap is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If we become aware that we have collected such information, we will
                take steps to delete it promptly.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                SkillSwap operates globally, and your information may be transferred to and processed in countries other
                than your own. We ensure appropriate safeguards are in place to protect your data during international
                transfers.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                We may update this privacy policy from time to time to reflect changes in our practices or legal
                requirements. We will notify you of significant changes via email or through our platform. Your
                continued use of SkillSwap after changes take effect constitutes acceptance of the updated policy.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <div className="mb-8 text-muted-foreground">
              <p className="mb-4">
                If you have questions about this privacy policy or how we handle your personal information, please
                contact us:
              </p>
              <ul className="list-none space-y-2">
                <li>
                  <strong>Email:</strong> [Privacy email to be added]
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About Privacy?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're committed to transparency and protecting your privacy. Contact us if you have any questions or
            concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
              <Link href="/help">Help Center</Link>
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
