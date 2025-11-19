import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Home, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-emerald-600" />
          </div>
          <CardTitle className="text-6xl font-bold text-emerald-900 mb-2">404</CardTitle>
          <CardTitle className="text-2xl font-bold text-gray-900">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            Oops! The page you're looking for seems to have wandered off on its own learning journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Don't worry, there are plenty of other amazing skills and teachers to discover on SkillSwap!
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/browse">
                <Search className="w-4 h-4 mr-2" />
                Browse Skills
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full">
              <Link href="javascript:history.back()">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Link>
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-gray-500">
              Need help?{" "}
              <Link href="/help" className="text-emerald-600 hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
