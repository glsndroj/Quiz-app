import { QuizIcon } from "@/icons/icons";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import InteractiveQuiz from "./InteractiveQuiz";

interface QuizData {
  id: number;
  questionText: string;
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export async function QuizPage({ params }: { params: { id: string } }) {
  const articleId = parseInt(params.id);
  if (isNaN(articleId)) {
    return <div>Error: Article ID is wrong.</div>;
  }

  const articleData = await prisma.articles.findUnique({
    where: { id: articleId },
    select: {
      title: true,
      quizzes: {
        orderBy: { id: "asc" },
      },
    },
  });
  if (!articleData) {
    notFound();
  }
  console.log("Fetched quizzes count: ", articleData?.quizzes?.length);

  const quizQuestions: QuizData[] = articleData.quizzes as QuizData[];

  return (
    <>
      <div className="flex justify-center p-5">
        <div className="flex flex-col border rounded-md w-full max-w-[1000px] p-5 gap-3 bg-white shadow-lg">
          <div className="flex items-center gap-5 border-b pb-3">
            <QuizIcon />
            <h1 className="text-2xl font-bold text-gray-800">Quick test</h1>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-gray-600">
              Take a quick test about your knowledge from your content
            </h2>
          </div>

          <div className="border p-4 rounded-md bg-gray-50 w-[800px] h-fit">
            <InteractiveQuiz quizData={quizQuestions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPage;
