"use client";
import React from "react";

interface QuizData {
  id: number;
  questionText: string;
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface InteractiveQuizProps {
  quizData: QuizData[];
  currentQuestionIndex: number;
  userAnswers: Record<number, string>;
  isAnswerSelected: boolean;
  handleAnswerSelect: (optionLetter: string) => void;
}

const getOptionLetter = (index: number) => ["A", "B", "C", "D"][index];

export default function InteractiveQuiz({
  quizData,
  currentQuestionIndex,
  userAnswers,
  isAnswerSelected,
  handleAnswerSelect,
}: InteractiveQuizProps) {
  const currentQuestion = quizData[currentQuestionIndex];
  const options = [
    currentQuestion.optionA,
    currentQuestion.optionB,
    currentQuestion.optionC,
    currentQuestion.optionD,
  ];

  const renderOption = (option: string, index: number) => {
    const optionLetter = getOptionLetter(index);
    const isSelected = userAnswers[currentQuestion.id] === optionLetter;

    let bgColor = isSelected
      ? "bg-blue-100 border-blue-500"
      : "bg-white border-gray-200";

    const disabled = isAnswerSelected && !isSelected;

    return (
      <button
        key={optionLetter}
        onClick={() => handleAnswerSelect(optionLetter)}
        disabled={disabled}
        className={`p-4 mb-3 text-left w-full border rounded-lg transition-all duration-300 
                            shadow-md 
                            ${bgColor} ${
          disabled ? "cursor-default opacity-80" : "hover:bg-gray-50"
        }`}
      >
        <span className="font-semibold mr-3 text-blue-600">
          {optionLetter}.
        </span>{" "}
        {option}
      </button>
    );
  };

  return (
    <>
      <div className="w-[800px] p-5 bg-white flex justify-between ">
        <p className="text-2xl max-w-2xl  font-medium text-gray-800">
          {currentQuestion.questionText}
        </p>
        <p className="text-2xl font-medium">
          {currentQuestionIndex + 1} / {quizData.length}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-7 max-w-3xl">{options.map(renderOption)}</div>
    </>
  );
}
