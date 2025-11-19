"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Application Error</CardTitle>
              <CardDescription className="text-lg">
                A critical error occurred that prevented the application from loading properly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800 font-medium mb-1">Error Details:</p>
                <p className="text-xs text-red-700 font-mono break-all">
                  {error.message || "A critical application error occurred"}
                </p>
                {error.digest && <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>}
              </div>

              <Button onClick={reset} className="w-full bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Application
              </Button>

              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-gray-500">
                  If this problem persists, please clear your browser cache and try again, or contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
