"use client";
import { Article, QuizIcon } from "@/icons/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LottieLoader from "./LottieReact";

export default function ArticleGenerator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        const result = await response.json();
        router.push(`/summary/${result.data.id}`);
        console.log("Article created successfully");
      } else {
        console.error("Failed to create article.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex flex-col border rounded-md w-[860px] p-5 gap-3">
        <div className="flex items-center gap-5">
          <QuizIcon />
          <h1 className="text-2xl font-semibold">Article quiz generator</h1>
        </div>
        <p className="text-gray-600">
          Paste your article below to generate a summarize and quiz question.
          Your articles will saved in the sidebar for future reference.
        </p>
        <div className="flex items-center gap-2">
          <Article />
          <h2 className="text-gray-600">Article Title</h2>
        </div>
        <input
          type="text"
          className="w-200 h-10 pl-5 border rounded-md"
          placeholder="Enter a title for your article..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Article />
          <h2 className="text-gray-600">Article Content</h2>
        </div>
        <textarea
          className="border p-2 rounded-md pl-5 min-h-32"
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className={`
              px-4 py-2 rounded-md transition-all duration-200 text-white
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-black hover:bg-gray-800 cursor-pointer"
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span>Generating...</span>
                <div className="w-6 h-6">
                  <LottieLoader />
                </div>
              </div>
            ) : (
              "Generate summary"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
