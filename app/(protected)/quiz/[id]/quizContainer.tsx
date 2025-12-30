"use client";
import React, { useState, useCallback, useMemo } from "react";
import InteractiveQuiz from "./InteractiveQuiz";
import { useRouter } from "next/navigation";
import { CorrectAnswer } from "@/icons/icons";



interface QuizData {
  id: number;
  questionText: string;
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface QuizContainerProps {
  quizData: QuizData[];
  articleId: number;
}

export default function QuizContainer({
  quizData,
  articleId,
}: QuizContainerProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  if (quizData.length === 0) {
    return (
      <div className="mt-5 p-4 text-red-500 border text-2xl text-center">
        Cannot found quiz!
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  
  const handleAnswerSelect = (optionLetter: string) => {
    if (isAnswerSelected) return;

   
    const updatedAnswers = {
      ...userAnswers,
      [currentQuestion.id]: optionLetter,
    };

    setUserAnswers(updatedAnswers);
    setIsAnswerSelected(true);

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnswerSelected(false);
      } else {
      
        const finalResults = quizData.map((q) => {
          const userSelectedLetter = updatedAnswers[q.id];

          
          let selectedText = "";
          if (userSelectedLetter === "A") selectedText = q.optionA;
          else if (userSelectedLetter === "B") selectedText = q.optionB;
          else if (userSelectedLetter === "C") selectedText = q.optionC;
          else if (userSelectedLetter === "D") selectedText = q.optionD;

          return {
            id: q.id,
            userAnswer: userSelectedLetter, 
            selectedText: selectedText, 
            correctAnswer: q.correctAnswer, 
          };
        });

    
        const finalScore = finalResults.filter(
          (r) => r.userAnswer?.toUpperCase() === r.correctAnswer?.toUpperCase()
        ).length;

        sessionStorage.setItem("quizResults", JSON.stringify(finalResults));
        router.push(
          `/result/${articleId}?score=${finalScore}&total=${quizData.length}`
        );
      }
    }, 500);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsAnswerSelected(false);
  };

  return (
    <InteractiveQuiz
      quizData={quizData}
      currentQuestionIndex={currentQuestionIndex}
      userAnswers={userAnswers}
      isAnswerSelected={isAnswerSelected}
      handleAnswerSelect={handleAnswerSelect}
    />
  );
}
