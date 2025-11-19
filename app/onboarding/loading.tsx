import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function OnboardingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-32 h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
            <Skeleton className="w-64 h-8 mx-auto mb-2" />
            <Skeleton className="w-80 h-4 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-full h-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
