"use client";

import { Article, Book, QuizIcon } from "@/icons/icons";

export default function Quiz() {
  return (
    <>
      <div className=" flex flex-col border rounded-md w-[860px] p-5 gap-3">
        <div className="flex items-center gap-5">
          <QuizIcon />
          <h1 className="text-2xl font-semibold">Quick test</h1>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-gray-600">
            {" "}
            Take a quick test about your knowledge from your content{" "}
          </h2>
        </div>
        <div className="border p-4 rounded-md bg-gray-50 min-h-[100px]"></div>
      </div>
    </>
  );
}
