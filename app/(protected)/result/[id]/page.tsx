"use client";
import { CorrectAnswer, QuizIcon, WrongAnswer } from "@/icons/icons";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface QuestionResult {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string;
}

const getOptionLetter = (index: number) => ["A", "B", "C", "D"][index];

export default function QuizResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useParams();
  const articleId = params.id as string;

  const [result, setResult] = useState<QuestionResult[]>([]);

  const score = searchParams.get("score");
  const totalQuestions = searchParams.get("total");

  const correctCount = score ? parseInt(score) : 0;
  const totalCount = totalQuestions ? parseInt(totalQuestions) : 0;

  useEffect(() => {
    const storedResult = sessionStorage.getItem("quizResults");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  const handleBackToQuiz = () => {
    router.back();
  };

  const handleFinishQuiz = () => {
    router.push(`/summary/${articleId}`);
  };

  return (
    <div className="w-[800px] max-w-xl mx-auto mt-20 p-10 border rounded-xl shadow-lg bg-white">
      <div className="flex items-center gap-5 border-b pb-4 mb-6">
        <QuizIcon />
        <h1 className="text-4xl font-extrabold text-gray-800">Result</h1>
      </div>

      <p className="text-gray-600">Let's see what you did</p>

      <div className="p-5 flex justify-center mb-8">
        <span className="text-4xl font-black ">
          {correctCount} / {totalCount}
        </span>
      </div>

      <div className="space-y-5">
        {result.map((q, index) => {
          console.log("Зөв Хариулт (correctAnswer):", q.correctAnswer);
          console.log("Хэрэглэгчийн Хариулт (userAnswer):", q.userAnswer);

          console.log(
            "Зөв Эсэх (isUserCorrect):",
            q.userAnswer === q.correctAnswer
          );
          const isUserCorrect = q.userAnswer === q.correctAnswer;

          let optionsToDisplay: {
            optionText: string;
            optionLetter: string;
            isCorrect: boolean;
            isUserSelected: boolean;
          }[] = [];

          if (q.options && Array.isArray(q.options)) {
            q.options.forEach((optionText, i) => {
              const optionLetter = getOptionLetter(i);
              const isCorrect = optionLetter === q.correctAnswer;
              const isUserSelected = optionLetter === q.userAnswer;

              if (isCorrect || isUserSelected) {
                optionsToDisplay.push({
                  optionText,
                  optionLetter,
                  isCorrect,
                  isUserSelected,
                });
              }
            });
          }

          return (
            <div key={q.id} className="p-3">
              <div className="flex items-start gap-3 mb-4">
                {isUserCorrect ? <CorrectAnswer /> : <WrongAnswer />}

                <p className="font-semibold text-lg text-gray-800">
                  {index + 1}. {q.questionText}
                </p>
              </div>

              <div className=" space-y-2">
                {optionsToDisplay.map((option, i) => {
                  let statusIcon = null;

                  if (option.isCorrect) {
                    statusIcon = <CorrectAnswer />;
                  } else if (option.isUserSelected && !option.isCorrect) {
                    statusIcon = <WrongAnswer />;
                  }

                  return (
                    <div
                      key={i}
                      className={`flex items-center p-3 border rounded-md transition duration-200`}
                    >
                      <span className="font-bold mr-3">
                        {option.optionLetter}.
                      </span>
                      <span className="flex-grow">{option.optionText}</span>
                      <span className="ml-auto">{statusIcon}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-7 mt-10">
        <button
          onClick={handleBackToQuiz}
          className=" p-3 w-[200px] bg-gray-400 hover:bg-gray-500  font-semibold rounded-md shadow-md"
        >
          Quiz again
        </button>
        <button
          onClick={handleFinishQuiz}
          className=" p-3 w-[200px] hover:bg-gray-200 font-semibold rounded-md shadow-md"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
