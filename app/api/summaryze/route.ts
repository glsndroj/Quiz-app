import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ Error: "Content required!" }, { status: 400 });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: `Summarize the following article concisely and accurately. Respond only with the summary text, no extra phrasing: ${content}`,
        },
      ],
    });

    const summary = result.text ?? "";
    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error("GEMINI API Error.", error);
    return NextResponse.json(
      { message: "Failed to generate summary from AI." },
      { status: 500 }
    );
  }
}
