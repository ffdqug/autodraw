"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react"
import Navigation from "@/components/navigation"

const faqs = [
  {
    question: "What is RimuDraw?",
    answer:
      "RimuDraw is an AI-powered tool that transforms your blank sketchbooks into beautiful anime artwork. Upload a photo of your drawing book and an anime reference image, and our AI will create artwork that looks hand-drawn rather than AI-generated.",
  },
  {
    question: "What art styles are available?",
    answer:
      "We offer 4 different styles: Manga (black & white pencil sketch), Colorize with colored pencils, Colorize with colored pens, and Auto Style (master-level detailed coloring). Each style is designed to look authentic and hand-crafted.",
  },
  {
    question: "What types of images should I upload?",
    answer:
      "Upload a clear photo of your blank drawing book or sketchbook page as the first image. For the reference, use high-quality anime character images. The AI works best with clear, well-lit photos and detailed anime references.",
  },
  {
    question: "How long does generation take?",
    answer:
      "Generation typically takes 30-60 seconds depending on the complexity of your reference image and selected style. You'll see a progress bar and cute animation while the AI works its magic!",
  },
  {
    question: "Can I add my signature to the artwork?",
    answer:
      "Yes! There's an optional signature field where you can add your artist name or watermark. This will be incorporated into the final artwork as if you signed it yourself.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support all common image formats including JPG, PNG, WEBP, and more. The generated artwork is provided as a high-quality PNG file that you can download and share.",
  },
  {
    question: "Is there a limit to how many images I can generate?",
    answer:
      "Currently, there may be rate limits based on Google's Gemini AI quotas. If you encounter limits, please wait a few minutes before trying again. We're working on expanding capacity!",
  },
  {
    question: "Can I use the generated artwork commercially?",
    answer:
      "The artwork is generated based on your uploaded reference images. Please ensure you have rights to the reference material if you plan commercial use. The AI-generated output itself can be used according to Google's Gemini AI terms of service.",
  },
  {
    question: "Why does my artwork look so realistic?",
    answer:
      "That's the magic of RimuDraw! Our AI is specifically trained to create artwork that mimics human drawing techniques, complete with natural shading, texture, and imperfections that make it look authentically hand-drawn.",
  },
  {
    question: "Can I request new features?",
    answer:
      "RimuDraw is constantly evolving. Feel free to reach out through the About page with suggestions for new art styles, features, or improvements you'd like to see.",
  },
]

export default function FAQPage() {
  const [hasEntered, setHasEntered] = useState(false)
  const [openItems, setOpenItems] = useState<number[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

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
            <div className="flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about RimuDraw
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`animate-in fade-in slide-in-from-left-4 duration-1000 hover:shadow-lg transition-all`}
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="hover:bg-muted/50 transition-colors">
                      <CardTitle className="flex items-center justify-between text-left">
                        <span className="text-lg">{faq.question}</span>
                        {openItems.includes(index) ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>

          {/* Contact Card */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardHeader className="text-center">
              <CardTitle>Still have questions?</CardTitle>
              <CardDescription>
                Don't hesitate to reach out! Visit our About page to get in touch with the developer.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  )
}
