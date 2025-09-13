"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Mail, Heart, Code, Palette } from "lucide-react"
import Navigation from "@/components/navigation"
import Image from "next/image"

export default function AboutPage() {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navigation />
      <div
        className={`min-h-screen bg-background pt-20 p-4 transition-all duration-1000 ${
          hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              xio yan ri
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Meet the creator behind the magic</p>
          </div>

          {/* Developer Card */}
          <Card className="animate-in fade-in slide-in-from-left-4 duration-1000 delay-300 hover:shadow-xl transition-all">
            <CardHeader className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin"
                  style={{ animationDuration: "4s" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-l from-purple-600 via-pink-500 to-red-500 animate-spin"
                  style={{ animationDuration: "3s", animationDirection: "reverse" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse"
                  style={{ animationDuration: "2s" }}
                ></div>
                <div className="absolute inset-1 rounded-full bg-background shadow-2xl"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden bg-background border-2 border-blue-500/20">
                  <Image
                    src="/developer-profile.jpeg"
                    alt="Ryuhan/Rohan Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-ping"
                  style={{ animationDuration: "3s" }}
                ></div>
                <div
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse blur-sm"
                  style={{ animationDuration: "2.5s" }}
                ></div>
              </div>
              <CardTitle className="text-2xl">Ryuhan / Rohan</CardTitle>
              <CardDescription>Full-Stack Developer & AI Enthusiast</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground leading-relaxed">
                Passionate developer who loves combining creativity with technology. RimuDraw was born from the idea of
                making AI-powered art creation accessible to everyone, especially anime and manga enthusiasts.
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  React & TypeScript
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  AI & Machine Learning
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Anime & Manga
                </Badge>
              </div>

              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/ryuhandev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.facebook.com/h4ndev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href="mailto:hanzthespike@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Gmail
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Project Story */}
          <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
            <CardHeader>
              <CardTitle>The Story Behind RimuDraw</CardTitle>
              <CardDescription>How this project came to life</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                RimuDraw started as a personal project to explore the intersection of AI and creative art. As an anime
                enthusiast and developer, I wanted to create a tool that could help artists and fans bring their
                favorite characters to life in their own sketchbooks.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Using Google's Gemini AI, RimuDraw can understand both your blank canvas and reference images, then
                generate artwork that looks hand-drawn rather than AI-generated. The goal is to make AI feel like a
                creative partner rather than a replacement for human artistry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This project represents countless hours of experimentation, learning, and passion for both technology
                and art. I hope RimuDraw inspires creativity and brings joy to fellow anime and art lovers around the
                world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
