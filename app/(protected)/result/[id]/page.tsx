"use client";
import { QuizIcon } from "@/icons/icons";
import React from "react";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function QuizResult({
  score,
  totalQuestions,
  onRestart,
}: QuizResultProps) {
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;

  return (
    <div className="flex flex-col w-[500px] border p-5 gap-3 rounded-2xl bg-white shadow-lg">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-5">
          <QuizIcon />
          <h1 className="text-2xl font-bold text-gray-800">Result</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="text-gray-600">Let's see what you did.</h2>
      </div>

      <div className="flex justify-center gap-8 mt-8">
        <button
          onClick={onRestart}
          className="px-3 py-2 text-lg rounded-md border"
        >
          Restart quiz
        </button>
        <button className="bg-black text-white rounded-md px-3 py-2">
          Save and leave
        </button>
      </div>
    </div>
  );
}
