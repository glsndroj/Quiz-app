import { Article, QuizIcon } from "@/icons/icons";

export default function ArticleGenerator() {
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
      />
      <div className="flex items-center gap-2">
        <Article />
        <h2 className="text-gray-600">Article Content</h2>
      </div>
      <input
        type="text"
        className="w-200 h-fit pl-5 pt-2 border rounded-md pb-40"
        placeholder="Paste your article content here..."
      />
      <div className="flex justify-end">
        <button className="bg-gray-300 text-white px-4 py-2 rounded-md">
          Generate summary
        </button>
      </div>
    </div>
  );
}
