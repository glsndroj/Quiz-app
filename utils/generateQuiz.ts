import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correct_answer: string;
}

export async function generateQuiz(summary: string): Promise<QuizQuestion[]> {
  // 1. API Client-ийн бэлэн байдлыг шалгах
  if (!ai) {
    console.error("AI Client Error: Gemini API key is missing or invalid.");
    return [];
  }

  const quizPrompt = `Using the following summary: "${summary}", generate exactly 5 multiple-choice questions. Each question must have exactly 4 options and specify the correct answer option using the letter (A, B, C, or D). The output MUST be a valid JSON array matching the type {question: string, options: [string, string, string,string], correct_answer: string} DO NOT include any text outside the JSON array or markdown formatting (e.g., \`\`\`json).`;

  try {
    // ✅ 1. API Call-ийг эхлүүлэхээс өмнө шалгах
    console.log("LOG: Attempting to call Gemini API for Quiz generation...");

    const quizResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: quizPrompt }] }],
    });

    const rawJSONText = quizResponse.text
      ?.trim()
      .replace(/^```json|```$/g, "")
      .trim();

    if (!rawJSONText) {
      console.error("AI returned no text or empty response after cleanup.");
      return [];
    }

    // ✅ 2. JSON хариуг хэвлэх
    console.log("AI Raw JSON Response (before parse):", rawJSONText);

    const quizQuestions: QuizQuestion[] = JSON.parse(rawJSONText);

    if (quizQuestions.length !== 5) {
      console.warn(
        `AI did not return exactly 5 questions. Returned: ${quizQuestions.length}`
      );
    }
    return quizQuestions;
  } catch (parseError) {
    // 🛑 3. Алдаа гарвал, тэр алдааг бүрэн хэвлэх
    console.error(
      "CRITICAL ERROR: Failed to generate or parse quiz from AI.",
      parseError
    );
    return [];
  }
}
