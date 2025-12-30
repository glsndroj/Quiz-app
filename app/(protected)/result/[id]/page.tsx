"use client";
import { CorrectAnswer, QuizIcon, WrongAnswer } from "@/icons/icons";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface QuestionResult {
  id: number;
  userAnswer: string;
  selectedText: string;
  correctAnswer: string;
}

export default function QuizResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const articleId = params.id as string;
  const [result, setResult] = useState<QuestionResult[]>([]);

  const score = searchParams.get("score") || "0";
  const total = searchParams.get("total") || "0";

  useEffect(() => {
    const data = sessionStorage.getItem("quizResults");
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  return (
    <div className="w-[800px] max-w-xl mx-auto mt-20 p-10 border rounded-2xl shadow-xl bg-white">
      <div className="flex items-center justify-between gap-5 border-b pb-4 mb-6">
        <div className="flex items-center gap-4">
          <QuizIcon />
          <h1 className="text-4xl font-extrabold ">Result</h1>
        </div>

        <div className="flex justify-end">
          <span className="text-4xl font-extrabold">
            {score} / {total}
          </span>
        </div>
      </div>

      <span className="text-gray-500">Let's see what you did.</span>

      <div className="space-y-4">
        {result.map((q, index) => {
          const isCorrect =
            q.userAnswer?.toUpperCase() === q.correctAnswer?.toUpperCase();

          return (
            <div
              key={index}
              className="flex items-center gap-4 p-5  rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="scale-125">
                {isCorrect ? <CorrectAnswer /> : <WrongAnswer />}
              </div>
              <span className="font-bold  text-xl w-8">{q.userAnswer}.</span>

              <div className="flex items-center grow gap-4">
                <div
                  className={`text-lg font-medium ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  <span className="font-bold">{q.userAnswer}.</span>
                  <span>{q.selectedText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-7 mt-12">
        <button
          onClick={() => router.back()}
          className="py-2 px-4 w-[200px] bg-gray-100 cursor-pointer  font-bold rounded-md hover:bg-gray-300 transition-all active:scale-95"
        >
          Quiz again
        </button>
        <button
          onClick={() => {
            sessionStorage.removeItem("quizResults");
            router.push(`/summary/${articleId}`);
          }}
          className={`
            bg-black text-white py-2 px-4 w-[200px] rounded-md transition-all 
            ${
              articleId
                ? "hover:bg-gray-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }
        `}
        >
          Finish quiz
        </button>
      </div>
    </div>
  );
}
