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
  manga: `Bisakah anda edit gambar pertama dan tempelkan gambar kedua ke sketchbook di gambar pertama dengan art style & arsiran serta warna yang sama seperti gambar pertama tanpa mistake sekalipun. Jadi terlihat seperti di gambar ulang oleh tangan manusia.${signature ? ` Tambahkan tanda tangan "${signature}" di pojok kanan bawah halaman.` : ""}`,

  colorize_pencil: `Tempelkan gambar kedua ke buku gambar di gambar pertama, buat tanpa mistake dengan coloring seperti menggunakan pensil warna yang diarsir oleh tangan manusia dan tidak terlihat seperti generate dari Ai.${signature ? ` Tambahkan tanda tangan "${signature}" di pojok kanan bawah halaman.` : ""}`,

  colorize_pen: `Tempelkan gambar kedua ke buku gambar di gambar pertama, buat tanpa mistake dengan coloring seperti menggunakan pulpen 9 warna yang diarsir oleh tangan (dengan arsiran sedetail mungkin) manusia dan tidak terlihat seperti generate dari Ai.${signature ? ` Tambahkan tanda tangan "${signature}" di pojok kanan bawah halaman.` : ""}`,

  auto_style: `Tempelkan gambar kedua ke buku gambar di gambar pertama, buat tanpa mistake dengan coloring auto detailing 99% semirip mungkin tetapi tidak terlihat seperti Ai. (jadi seperti sepuh gambar dengan skill coloring yang gila)${signature ? ` Tambahkan tanda tangan "${signature}" di pojok kanan bawah halaman.` : ""}`,
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
