"use client";
import { Article, Book, QuizIcon } from "@/icons/icons";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

interface SummarizedContentProps {
  initialContent: string | null;
  articleTitle: string | null;
}

export default function SummarizedContent({
  initialContent,
  articleTitle,
}: SummarizedContentProps) {
  const [summary, setSummary] = useState("Summaryzing..");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateSummary = async () => {
      try {
        const response = await fetch("/api/summaryze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: initialContent }),
        });

        if (response.ok) {
          const data = await response.json();
          setSummary(data.summary || "Failed to summaryze.");
        } else {
          setSummary("Server error.");
        }
      } catch (error) {
        setSummary("Error.");
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [initialContent]);

  return (
    <form>
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
          {isLoading ? "Summaryzing..." : summary}
        </div>

        <div className="flex items-center gap-2">
          <Article />
          <h2 className="text-gray-600">Article Content (Original)</h2>
        </div>
        <div className="border p-4 rounded-md text-gray-800 whitespace-pre-wrap max-h-40 overflow-y-auto">
          {initialContent}
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className={`
                bg-black text-white px-4 py-2 rounded-md transition duration-200 
                ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "hover:bg-gray-700"
                }
            `}
            disabled={isLoading}
          >
            Take quiz
          </button>
        </div>
      </div>
    </form>
  );
}
