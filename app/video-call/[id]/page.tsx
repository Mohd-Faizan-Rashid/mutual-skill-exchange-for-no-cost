"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, Settings, MessageCircle, Clock, Maximize, Minimize, Volume2 } from 'lucide-react'
import Link from "next/link"
import { getBrowserSupabase } from "@/lib/supabase/client"
import { useRouter } from 'next/navigation'

interface Participant {
  id: string
  name: string
  avatar: string
  skill: string
  isVideoEnabled: boolean
  isAudioEnabled: boolean
  isScreenSharing: boolean
}

export default function VideoCallPage({ params }: { params: { id: string } }) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [volume, setVolume] = useState([80])
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = getBrowserSupabase()

  useEffect(() => {
    async function fetchSession() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          router.push("/auth/login")
          return
        }

        // Fetch match details to get the other participant
        // We assume params.id is the match_id or session_id. Let's assume match_id for simplicity or fetch session.
        // If it's a session ID, we get the match.
        
        // Try fetching as match_id first
        const { data: match, error } = await supabase
          .from("matches")
          .select(`
            *,
            skills (name)
          `)
          .eq("id", params.id)
          .single()

        if (error || !match) {
           // Handle error
           console.error("Match not found")
           return
        }

        const otherUserId = match.teacher_id === user.id ? match.learner_id : match.teacher_id
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", otherUserId)
          .single()

        if (profile) {
          setParticipant({
            id: profile.id,
            name: profile.display_name || "User",
            avatar: profile.avatar_url || "",
            skill: match.skills?.name || "Skill Exchange",
            isVideoEnabled: true,
            isAudioEnabled: true,
            isScreenSharing: false,
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [params.id, router, supabase])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndCall = () => {
    router.push("/messages")
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Connecting...</div>
  }

  if (!participant) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Call not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      {!isFullscreen && (
        <header className="absolute top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SkillSwap</span>
              </Link>
              <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                Live
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(callDuration)}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Main Video Area */}
      <div className="relative h-screen flex">
        {/* Remote Participant Video */}
        <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
          {participant.isVideoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                <AvatarFallback className="text-4xl">
                  {participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                <AvatarFallback className="text-4xl">
                  {participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-2">{participant.name}</h3>
              <p className="text-gray-400">{participant.skill}</p>
              <Badge variant="secondary" className="mt-2 bg-gray-800 text-gray-300">
                <VideoOff className="w-3 h-3 mr-1" />
                Camera Off
              </Badge>
            </div>
          )}

          {/* Participant Info Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                <AvatarFallback>
                  {participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{participant.name}</p>
                <div className="flex items-center space-x-1">
                  {participant.isAudioEnabled ? (
                    <Mic className="w-3 h-3 text-green-400" />
                  ) : (
                    <MicOff className="w-3 h-3 text-red-400" />
                  )}
                  {participant.isVideoEnabled ? (
                    <Video className="w-3 h-3 text-green-400" />
                  ) : (
                    <VideoOff className="w-3 h-3 text-red-400" />
                  )}
                  {participant.isScreenSharing && <Monitor className="w-3 h-3 text-blue-400" />}
                </div>
              </div>
            </div>
          </div>

          {/* Screen Sharing Indicator */}
          {participant.isScreenSharing && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Monitor className="w-3 h-3 mr-1" />
                Screen Sharing
              </Badge>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-20 right-4 w-64 h-48 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
          {isVideoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-green-900 to-teal-900 flex items-center justify-center">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt="You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <VideoOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Camera Off</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/50 text-white text-xs">
              You
            </Badge>
          </div>
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col animate-slide-up">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Chat</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                  ×
                </Button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-sm">Welcome to the video call! Feel free to ask questions during our session.</p>
                  <p className="text-xs text-gray-400 mt-1">System • Now</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <div className="w-20">
                  <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
                </div>
              </div>
            </div>

            {/* Center Controls */}
            <div className="flex items-center space-x-3">
              <Button
                variant={isAudioEnabled ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              >
                {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>

              <Button
                variant={isVideoEnabled ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              >
                {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>

              <Button
                variant={isScreenSharing ? "default" : "secondary"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                onClick={toggleScreenShare}
              >
                <Monitor className="w-5 h-5" />
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="rounded-full w-12 h-12 p-0 bg-red-600 hover:bg-red-700"
                onClick={handleEndCall}
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              <Button
                variant={isChatOpen ? "default" : "secondary"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>

              <Button variant="secondary" size="lg" className="rounded-full w-12 h-12 p-0">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="absolute top-20 left-4">
        <Card className="bg-black/50 backdrop-blur-sm border-white/10">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400">Connected</span>
              <span className="text-gray-400">• HD Quality</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
