import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const apiKey = "AIzaSyARS9WMM7r1A6X-AcXqWWhbXwpudbjxhuY"

    const genAI = new GoogleGenerativeAI(apiKey)

    const formData = await request.formData()
    const drawingBook = formData.get("drawingBook") as File
    const reference = formData.get("reference") as File
    const style = formData.get("style") as string
    const signature = formData.get("signature") as string

    console.log("[Rimuru] Received style:", style)
    console.log("[Rimuru] Has signature:", !!signature)

    if (!drawingBook || !reference) {
      return NextResponse.json({ error: "Both images are required" }, { status: 400 })
    }

    // Convert files to base64
    const drawingBookBuffer = await drawingBook.arrayBuffer()
    const referenceBuffer = await reference.arrayBuffer()

    const drawingBookBase64 = Buffer.from(drawingBookBuffer).toString("base64")
    const referenceBase64 = Buffer.from(referenceBuffer).toString("base64")

    console.log("[Rimuru] Images converted to base64")

    const stylePrompts = {
manga: Take the anime character from the second image (reference) and draw it onto the drawing book page from the first image in manga style. Create a pencil sketch style drawing that looks hand-drawn with black and white shading, cross-hatching, and manga-style line work. The drawing should appear naturally placed on the book page as if someone drew it by hand. Make it look realistic and not AI-generated.${signature ?  Add the signature "${signature}" in the bottom right corner of the page. : ""},

colorize_pencil: `Take the anime character from the second image (reference) and draw it onto the drawing book page from the first image using colored pencil style. Use realistic colored pencil techniques with 9 colors: soft blending, layered coloring, and hand-drawn shading that looks like it was colored by a human artist. The drawing should appear naturally placed on the book page with realistic pencil texture and coloring.${signature ? ` Add the signature "${signature}" in the bottom right corner of the page.` : ""}`,  

  colorize_pen: `Take the anime character from the second image (reference) and draw it onto the drawing book page from the first image using colored pen style. Use 9 colored pens with detailed cross-hatching, line work, and pen-style shading techniques. The drawing should look like it was carefully drawn by hand with colored pens, showing realistic pen strokes and detailed shading.${signature ? ` Add the signature "${signature}" in the bottom right corner of the page.` : ""}`,  

  auto_style: `Take the anime character from the second image (reference) and draw it onto the drawing book page from the first image with 99% accuracy and professional coloring. Create a masterpiece-quality drawing that looks like it was done by a professional artist with perfect proportions, detailed coloring, smooth gradients, and realistic shading. Make it look hand-drawn, not AI-generated.${signature ? ` Add the signature "${signature}" in the bottom right corner of the page.` : ""}`,  
}
  
    const enhancedPrompt = stylePrompts[style as keyof typeof stylePrompts] || stylePrompts.manga

    console.log("[Rimuru] Enhanced prompt prepared for style:", style)

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-preview-image-generation",
    })

    console.log("[Rimuru] Attempting to generate image...")

    const result = await model.generateContent({
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: drawingBookBase64,
                mimeType: drawingBook.type,
              },
            },
            {
              inlineData: {
                data: referenceBase64,
                mimeType: reference.type,
              },
            },
            {
              text: enhancedPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    })

    console.log("[Rimuru] Content generated successfully")

    const response = await result.response

    const candidates = response.candidates
    if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
      const imageParts = candidates[0].content.parts.filter((part: any) => part.inlineData && part.inlineData.data)

      if (imageParts.length > 0) {
        const imageData = imageParts[0].inlineData.data
        console.log("[v0] Image generated successfully")

        return NextResponse.json({
          success: true,
          imageData: imageData,
          mimeType: imageParts[0].inlineData.mimeType || "image/png",
          message: "Image generated successfully",
          style: style,
        })
      }
    }

    const generatedText = response.text()
    console.log("[Rimuru] No image generated, returning text response")

    return NextResponse.json({
      success: false,
      error: "No image was generated",
      details: generatedText,
      style: style,
    })
  } catch (error) {
    console.error("[Rimuru] API Error:", error)
    if (error instanceof Error) {
      console.error("[Rimuru] Error message:", error.message)
      console.error("[Rimuru] Error stack:", error.stack)

      if (error.message.includes("429") || error.message.includes("quota") || error.message.includes("rate limit")) {
        return NextResponse.json(
          {
            error: "API Quota Exceeded",
            details:
              "You have exceeded your API quota limits. Please wait a few minutes before trying again, or check your Google AI Studio billing settings to increase your quota.",
            isQuotaError: true,
          },
          { status: 429 },
        )
      }
    }
    return NextResponse.json(
      {
        error: "Failed to generate art",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
