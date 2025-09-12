"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Coffee, Zap, ExternalLink, Gift } from "lucide-react"
import Navigation from "@/components/navigation"
import Image from "next/image"

export default function DonationPage() {
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
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-spin"></div>
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-l from-red-500 via-purple-500 to-blue-500 animate-spin"
                  style={{ animationDirection: "reverse", animationDuration: "3s" }}
                ></div>
                <div className="absolute inset-1 rounded-full bg-background"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/donation-character-main.png"
                    alt="Donation Character"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Gift className="w-8 h-8 text-yellow-500 animate-bounce" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Support RimuDraw
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help keep this project alive and growing! Your voluntary support enables continuous development and better
              AI models.
            </p>
          </div>

          {/* Main Donation Card */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 bg-gradient-to-br from-slate-900/50 to-blue-900/30 border-2 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-spin"></div>
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-l from-red-500 via-purple-500 to-blue-500 animate-spin"
                    style={{ animationDirection: "reverse", animationDuration: "3s" }}
                  ></div>
                  <div className="absolute inset-1 rounded-full bg-background"></div>
                  <div className="absolute inset-2 rounded-full overflow-hidden">
                    <Image
                      src="/donation-character-main.png"
                      alt="Donation Character"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl">Support Ryuhan's Work</CardTitle>
              <CardDescription className="text-lg">
                Every donation helps improve RimuDraw and develop new AI-powered features
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Why Your Support Matters</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 justify-center">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Server & API costs</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    <span>Development time</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>New features</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-500/20 backdrop-blur-sm">
                <p className="text-sm text-muted-foreground">
                  <strong>Donate as you wish!</strong> Any amount is greatly appreciated. Your generosity keeps RimuDraw
                  free for everyone.
                </p>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => window.open("https://saweria.co/ryuhanm", "_blank")}
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate via Saweria
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 bg-slate-900/30 border border-blue-500/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Suggested Amounts</CardTitle>
              <CardDescription>Choose any amount that feels right for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg hover:bg-blue-900/30 transition-colors border border-blue-500/10">
                  <Coffee className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  <div className="font-semibold">Rp 1,000</div>
                  <div className="text-xs text-muted-foreground">Small support</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg hover:bg-blue-900/30 transition-colors border border-blue-500/10">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                  <div className="font-semibold">Rp 2,000</div>
                  <div className="text-xs text-muted-foreground">Show love</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg hover:bg-blue-900/30 transition-colors border border-blue-500/10">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <div className="font-semibold">Rp 5,000</div>
                  <div className="text-xs text-muted-foreground">Power boost</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg hover:bg-blue-900/30 transition-colors border border-blue-500/10">
                  <Gift className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div className="font-semibold">Rp 10,000</div>
                  <div className="text-xs text-muted-foreground">Big support</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thank You Section */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 backdrop-blur-sm">
            <CardContent className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20">
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin"
                    style={{ animationDuration: "2s" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-l from-purple-600 via-pink-500 to-red-500 animate-spin"
                    style={{ animationDuration: "3s", animationDirection: "reverse" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse"
                    style={{ animationDuration: "1.5s" }}
                  ></div>
                  <div className="absolute inset-1 rounded-full bg-background"></div>
                  <div className="absolute inset-2 rounded-full overflow-hidden">
                    <Image
                      src="/developer-sunglasses.jpeg"
                      alt="Cool Developer"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-ping"
                    style={{ animationDuration: "2s" }}
                  ></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Thank You for Your Support!</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every contribution, no matter the size, makes a huge difference. Your support helps keep RimuDraw free
                for everyone while enabling continuous improvements and new features. Together, we're making AI art
                creation more accessible and fun!
              </p>
              <div className="flex justify-center mt-6 space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-6 h-6 text-red-500 animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
