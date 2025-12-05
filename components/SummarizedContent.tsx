"use client";
import { Article, Book, QuizIcon } from "@/icons/icons";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import prisma from "@/lib/prisma";
import { ArticlesScalarFieldEnum } from "@/lib/generated/prisma/internal/prismaNamespaceBrowser";
import { FullContentDialog } from "./SummaryzeSeeMore";

interface SummarizedContentProps {
  initialContent: string | null;
  articleTitle: string | null;
  articleSummary: string | null;
}

export default function SummarizedContent({
  initialContent,
  articleTitle,
  articleSummary,
}: SummarizedContentProps) {
  return (
    <>
      <div className=" flex flex-col border rounded-md w-[860px] p-5 gap-3">
        <div className="flex items-center gap-5">
          <QuizIcon />
          <h1 className="text-2xl font-semibold">
            Article quiz generator: {articleTitle}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Book />
          <h2 className="text-gray-600">Summarized content</h2>
        </div>
        <div className="border p-4 rounded-md bg-gray-50 min-h-[100px] whitespace-pre-wrap">
          {articleSummary}
        </div>

        <div className="flex items-center gap-2">
          <Article />
          <h2 className="text-gray-600">Article Content (Original)</h2>
        </div>
        <div className="border p-4 rounded-md text-gray-800 whitespace-pre-wrap max-h-40 overflow-hidden">
          {initialContent}
        </div>

        <div className="flex justify-between">
          <button
            className={`
                bg-black text-white px-4 py-2 rounded-md transition duration-200  cursor-pointer
               
            `}
          >
            Take quiz
          </button>
          <FullContentDialog
            initialContent={initialContent}
            articleTitle={articleTitle}
          />
        </div>
      </div>
    </>
  );
}
