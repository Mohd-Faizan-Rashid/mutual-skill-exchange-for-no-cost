import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, MapPin, MessageCircle } from "lucide-react"

interface ProfileCardProps {
  user: {
    id: string
    name: string
    location: string
    avatar?: string
    bio: string
    skills: string[]
    rating: number
    reviewCount: number
    studentsCount: number
    isOnline?: boolean
  }
  compact?: boolean
}

export function ProfileCard({ user, compact = false }: ProfileCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className={compact ? "p-4" : "p-6"}>
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className={compact ? "w-12 h-12" : "w-16 h-16"}>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className={`font-semibold ${compact ? "text-sm" : "text-base"} truncate`}>{user.name}</h3>
                <div className="flex items-center text-muted-foreground text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {user.location}
                </div>
              </div>
              {!compact && (
                <Button size="sm" variant="ghost">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              )}
            </div>

            {!compact && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{user.bio}</p>}

            <div className="flex flex-wrap gap-1 mb-3">
              {user.skills.slice(0, compact ? 2 : 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {user.skills.length > (compact ? 2 : 3) && (
                <Badge variant="outline" className="text-xs">
                  +{user.skills.length - (compact ? 2 : 3)}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                <span className="font-medium">{user.rating}</span>
                <span className="text-muted-foreground ml-1">({user.reviewCount})</span>
              </div>
              <span className="text-muted-foreground">{user.studentsCount} students</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
