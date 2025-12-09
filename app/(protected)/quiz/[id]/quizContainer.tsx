"use client";
import React, { useState, useCallback, useMemo } from "react";

import InteractiveQuiz from "./InteractiveQuiz";
import QuizResult from "../../result/[id]/page";
import { useRouter } from "next/navigation";

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

export default function QuizContainer({ quizData }: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const router = useRouter();

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
        const totalQuestions = quizData.length;

        router.push(`/result/[id]?score=X&total=Y`);
      }
    }, 500);
  };

  // const handleRestart = () => {
  //   setCurrentQuestionIndex(0);
  //   setUserAnswers({});
  //   setIsSubmitted(false);
  //   setIsAnswerSelected(false);
  // };

  // if (isSubmitted) {
  //   return (
  //     <QuizResult
  //       score={calculateScore}
  //       totalQuestions={quizData.length}
  //       onRestart={handleRestart}
  //     />
  //   );
  // }

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
