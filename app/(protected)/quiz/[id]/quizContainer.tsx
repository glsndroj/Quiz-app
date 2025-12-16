"use client";
import React, { useState, useCallback, useMemo } from "react";
import InteractiveQuiz from "./InteractiveQuiz";
import { useRouter } from "next/navigation";
import { CorrectAnswer } from "@/icons/icons";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

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

  const isAnswerCorrect = useCallback(
    (question: QuizData, userAnswer: string | undefined) => {
      if (!userAnswer) return false;
      return userAnswer.toUpperCase() === question.correctAnswer.toUpperCase();
    },
    []
  );

  const calculateScore = useMemo(() => {
    let correctCount = 0;
    quizData.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      if (isAnswerCorrect(q, userAnswer)) {
        correctCount++;
      }
    });
    return correctCount;
  }, [quizData, userAnswers, isAnswerCorrect]);

  const handleAnswerSelect = (optionLetter: string) => {
    if (isSubmitted) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionLetter,
    }));

    setIsAnswerSelected(true);

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((i) => i + 1);
        setIsAnswerSelected(false);
      } else {
        const score = calculateScore;
        const total = quizData.length;

        const resultDetails = quizData.map((q) => ({
          correctAnswer: q.correctAnswer,
        }));

        sessionStorage.setItem("quizResults", JSON.stringify(resultDetails));

        router.push(`/result/${articleId}?score=${score}&total=${total}`);
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
