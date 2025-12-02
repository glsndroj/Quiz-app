import { Article, QuizIcon } from "@/icons/icons";
import { useState } from "react";

export default function ArticleGenerator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    console.log("POST Response: ", data);
  };
  return (
    <div className=" flex flex-col border rounded-md w-[860px] p-5 gap-3">
      <div className="flex items-center gap-5">
        <QuizIcon />
        <h1 className="text-2xl font-semibold">Article quiz generator</h1>
      </div>
      <p className="text-gray-600">
        Paste your article below to generate a summarize and quiz question. Your
        articles will saved in the sidebar for future reference.
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
        className="border p-2 rounded-md h-fit pl-5"
        placeholder="Content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-gray-300 text-white px-4 py-2 rounded-md"
        >
          Generate summary
        </button>
      </div>
    </div>
  );
}
