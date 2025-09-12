"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ImageIcon, Palette, Wand2, Download, Sparkles, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import LoadingAnimation from "@/components/loading-animation"
import Image from "next/image"

type ArtStyle = "manga" | "colorize_pencil" | "colorize_pen" | "auto_style"

interface UploadedImage {
  file: File
  preview: string
}

export default function AutoDrawPage() {
  const [drawingBook, setDrawingBook] = useState<UploadedImage | null>(null)
  const [reference, setReference] = useState<UploadedImage | null>(null)
  const [artStyle, setArtStyle] = useState<ArtStyle>("manga")
  const [signature, setSignature] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [generatedMimeType, setGeneratedMimeType] = useState<string>("image/png")
  const [showLoading, setShowLoading] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  const drawingBookRef = useRef<HTMLInputElement>(null)
  const referenceRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "drawingBook" | "reference") => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    const preview = URL.createObjectURL(file)
    const uploadedImage = { file, preview }

    if (type === "drawingBook") {
      setDrawingBook(uploadedImage)
    } else {
      setReference(uploadedImage)
    }
  }

  const generateArt = async () => {
    if (!drawingBook || !reference) {
      toast({
        title: "Missing images",
        description: "Please upload both the drawing book and reference image",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setShowLoading(true)
    setGeneratedImage(null)

    try {
      const formData = new FormData()
      formData.append("drawingBook", drawingBook.file)
      formData.append("reference", reference.file)
      formData.append("style", artStyle)
      formData.append("signature", signature)

      const response = await fetch("/api/generate-art", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to generate art")
      }

      const data = await response.json()

      if (data.success && data.imageData) {
        setGeneratedImage(data.imageData)
        setGeneratedMimeType(data.mimeType || "image/png")
        toast({
          title: "Art generated successfully!",
          description: "Your AI-powered artwork is ready",
        })
      } else {
        throw new Error(data.error || "No image was generated")
      }
    } catch (error) {
      console.error("Generation error:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Please try again with different images",
        variant: "destructive",
      })
      setShowLoading(false)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  const downloadResult = () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.href = `data:${generatedMimeType};base64,${generatedImage}`
      link.download = `rimu-draw-${artStyle}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({
        title: "Download started!",
        description: "Your artwork is being downloaded",
      })
    }
  }

  return (
    <>
      <Navigation />
      <LoadingAnimation isVisible={showLoading} onComplete={handleLoadingComplete} />

      <div
        className={`min-h-screen bg-background pt-20 p-4 transition-all duration-1000 ${
          hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center space-x-3 mb-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                RimuDraw AI
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your sketches into stunning anime artwork with the power of advanced AI technology
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-400" />
                    Drawing Book
                  </CardTitle>
                  <CardDescription>Upload your blank drawing book or sketchbook page</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-all duration-300 hover:bg-blue-50/5"
                    onClick={() => drawingBookRef.current?.click()}
                  >
                    {drawingBook ? (
                      <div className="space-y-4 animate-in fade-in zoom-in-50 duration-500">
                        <img
                          src={drawingBook.preview || "/placeholder.svg"}
                          alt="Drawing book"
                          className="max-h-48 mx-auto rounded-lg shadow-md"
                        />
                        <p className="text-sm text-muted-foreground">{drawingBook.file.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground hover:text-blue-400 transition-colors" />
                        <p className="text-muted-foreground">Click to upload your drawing book</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={drawingBookRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "drawingBook")}
                  />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-400" />
                    Anime Reference
                  </CardTitle>
                  <CardDescription>Upload your anime reference image to be drawn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-all duration-300 hover:bg-purple-50/5"
                    onClick={() => referenceRef.current?.click()}
                  >
                    {reference ? (
                      <div className="space-y-4 animate-in fade-in zoom-in-50 duration-500">
                        <img
                          src={reference.preview || "/placeholder.svg"}
                          alt="Reference"
                          className="max-h-48 mx-auto rounded-lg shadow-md"
                        />
                        <p className="text-sm text-muted-foreground">{reference.file.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground hover:text-purple-400 transition-colors" />
                        <p className="text-muted-foreground">Click to upload anime reference</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={referenceRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "reference")}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-pink-400" />
                    Art Style
                  </CardTitle>
                  <CardDescription>Choose your preferred drawing style</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="style">Drawing Style</Label>
                    <Select value={artStyle} onValueChange={(value: ArtStyle) => setArtStyle(value)}>
                      <SelectTrigger className="hover:border-blue-400 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manga">
                          <div className="flex items-center gap-2">
                            <Image src="/slime-sad.png" alt="Manga style" width={20} height={20} />
                            Manga (Pencil Sketch)
                          </div>
                        </SelectItem>
                        <SelectItem value="colorize_pencil">
                          <div className="flex items-center gap-2">
                            <Image src="/slime-blushing.png" alt="Colored pencil style" width={20} height={20} />
                            Colorize (Colored Pencil)
                          </div>
                        </SelectItem>
                        <SelectItem value="colorize_pen">
                          <div className="flex items-center gap-2">
                            <Image src="/slime-happy.png" alt="Colored pen style" width={20} height={20} />
                            Colorize (Colored Pen)
                          </div>
                        </SelectItem>
                        <SelectItem value="auto_style">
                          <div className="flex items-center gap-2">
                            <Image src="/slime-excited.png" alt="Auto style" width={20} height={20} />
                            Auto Style (Master Level)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="signature">Signature (Optional)</Label>
                    <Input
                      id="signature"
                      placeholder="Your artist signature..."
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>

                  <Button
                    onClick={generateArt}
                    disabled={!drawingBook || !reference || isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Magic...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Art
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {generatedImage && (
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-1000 hover:shadow-xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Generated Artwork
                    </CardTitle>
                    <CardDescription>Your AI-generated masterpiece is ready!</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
                      <img
                        src={`data:${generatedMimeType};base64,${generatedImage}`}
                        alt="Generated artwork"
                        className="w-full h-auto max-h-96 object-contain animate-in fade-in zoom-in-95 duration-1000"
                      />
                    </div>
                    <Button
                      onClick={downloadResult}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Artwork
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}
