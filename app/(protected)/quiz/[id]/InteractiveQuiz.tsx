"use client";
import React, { useState, useEffect, useCallback } from "react";

// Prisma Schema-тай ижил Quiz-ийн төрөл
interface QuizData {
  id: number;
  questionText: string;
  correctAnswer: string; // Stored as 'A', 'B', 'C', or 'D'
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface InteractiveQuizProps {
  quizData: QuizData[];
}

// 💡 Зөвхөн хариултын үсгийг optionIndex-ээр олох
const getOptionLetter = (index: number) => ["A", "B", "C", "D"][index];

export default function InteractiveQuiz({ quizData }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({}); // {questionId: 'A'|'B'|'C'|'D'}
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false); // Хариулт сонгосон эсэхийг хянах

  if (quizData.length === 0) {
    return (
      <div className="mt-5 p-4 text-red-500 border  text-center">
        Cannot found quiz!
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const options = [
    currentQuestion.optionA,
    currentQuestion.optionB,
    currentQuestion.optionC,
    currentQuestion.optionD,
  ];

  const isAnswerCorrect = useCallback(
    (question: QuizData, userAnswer: string | undefined) => {
      if (!userAnswer) return false;
      // Сонгосон үсэг болон Database-ийн том үсэг хоорондын шалгалт
      return userAnswer.toUpperCase() === question.correctAnswer.toUpperCase();
    },
    []
  );

  const calculateScore = () => {
    let correctCount = 0;
    quizData.forEach((q) => {
      const userAnswer = userAnswers[q.id];
      if (isAnswerCorrect(q, userAnswer)) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  const handleAnswerSelect = (optionLetter: string) => {
    if (isSubmitted) return;

    // 1. Хариултыг хадгалах
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionLetter,
    }));

    // 2. Хариулт сонгосон төлөвийг идэвхжүүлэх
    setIsAnswerSelected(true);

    // 3. 500ms дараа дараагийн асуулт руу шилжих
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((i) => i + 1);
        setIsAnswerSelected(false); // Шинэ асуултанд шилжихэд төлөвийг Reset хийх
      } else {
        // 4. Сүүлийн асуулт байвал шууд оноог тооцох
        calculateScore();
      }
    }, 500);
  };

  const renderOption = (option: string, index: number) => {
    const optionLetter = getOptionLetter(index);
    const isSelected = userAnswers[currentQuestion.id] === optionLetter;
    const hasUserAnswered = !!userAnswers[currentQuestion.id]; // Хариулт сонгосон эсэх

    let bgColor = isSelected
      ? "bg-gray-100 border-gray-500"
      : "bg-white border-gray-200";

    // isAnswerSelected үед бусад товчлуурыг идэвхгүй болгох
    const disabled = isSubmitted || (isAnswerSelected && !isSelected);

    return (
      <button
        key={optionLetter}
        onClick={() => handleAnswerSelect(optionLetter)}
        disabled={disabled}
        className={`p-4 mb-3 text-left w-full border rounded-lg transition-all duration-300 
                            shadow-md 
                            ${bgColor} ${
          disabled ? "cursor-default" : "hover:bg-gray-50"
        }`}
      >
        <span className="font-semibold mr-3">{optionLetter}.</span> {option}
      </button>
    );
  };

  // 💡 Оноог харуулах хэсэг (submit хийсэн тохиолдолд)
  if (isSubmitted && currentQuestionIndex === quizData.length - 1) {
    const totalCorrect = quizData.filter((q) =>
      isAnswerCorrect(q, userAnswers[q.id])
    ).length;
    const percentage = (totalCorrect / quizData.length) * 100;

    return (
      <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl text-center">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
          Quiz Дууслаа!
        </h2>
        <p className="text-5xl font-bold mb-6 text-gray-800">
          {totalCorrect} / {quizData.length}
        </p>
        <p className="text-2xl font-semibold mb-8 text-green-600">
          Нийт {percentage.toFixed(0)}% үнэлгээтэй байна.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Шинээр Quiz Эхлүүлэх
        </button>
      </div>
    );
  }

  // 💡 Асуултыг харуулах үндсэн хэсэг
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} / {quizData.length}
      </h2>

      <p className="text-lg mb-6 font-semibold">
        {currentQuestion.questionText}
      </p>

      <div className="grid grid-cols-2 gap-4">{options.map(renderOption)}</div>
    </div>
  );
}
