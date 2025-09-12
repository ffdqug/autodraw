"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingAnimationProps {
  isVisible: boolean
  onComplete: () => void
}

export default function LoadingAnimation({ isVisible, onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setIsCompleting(false)
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          return prev // Stay at 85% until actual completion
        }
        return prev + Math.random() * 3 + 2 // Faster increment
      })
    }, 300) // Shorter intervals

    return () => clearInterval(interval)
  }, [isVisible])

  const handleComplete = () => {
    setProgress(100)
    setIsCompleting(true)

    setTimeout(() => {
      onComplete()
    }, 800)
  }

  useEffect(() => {
    if (isVisible && progress >= 85) {
      const timer = setTimeout(handleComplete, 1000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, progress])

  if (!isVisible && !isCompleting) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-1500 ${
        isCompleting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-8 max-w-md mx-auto p-8">
        {/* Loading GIF */}
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src="/loading-animation.gif"
            alt="Generating artwork..."
            fill
            className="object-contain rounded-lg"
            unoptimized // Important for GIFs
          />
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Creating your masterpiece...</h3>

          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {progress < 20 && "Analyzing your images..."}
            {progress >= 20 && progress < 45 && "Understanding the art style..."}
            {progress >= 45 && progress < 75 && "Generating artwork..."}
            {progress >= 75 && "Finalizing details..."}
          </p>

          <div className="text-lg font-mono text-blue-400">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  )
}
