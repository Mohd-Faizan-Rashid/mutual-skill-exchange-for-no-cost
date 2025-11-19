import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-900">Check Your Email</CardTitle>
          <CardDescription>We've sent you a confirmation link to complete your registration</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Please check your email and click the confirmation link to activate your account. You can close this window
            once you've confirmed your email.
          </p>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <p className="text-sm text-emerald-800 font-medium mb-2">What's next?</p>
            <p className="text-xs text-emerald-700">
              After confirming your email, we'll guide you through a quick setup to personalize your SkillSwap
              experience!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
