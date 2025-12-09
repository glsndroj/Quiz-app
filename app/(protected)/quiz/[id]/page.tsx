import { QuizIcon } from "@/icons/icons";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

import QuizContainer from "./quizContainer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const quizQuestions: QuizData[] = articleData.quizzes as QuizData[];

  return (
    <>
      <div className="flex flex-col border p-5 gap-3 rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-5">
            <QuizIcon />
            <h1 className="text-2xl font-bold text-gray-800">Quick test</h1>
          </div>
          <Dialog>
            <DialogTrigger className="bg-gray-50 px-2 border rounded-md active:bg-gray-200 cursor-pointer">
              X
            </DialogTrigger>
            <DialogContent className="w-[500px]">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription className="text-red-500">
                  If you press 'Cancel', this quiz will restart from the
                  beginning.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-between px-10">
                <DialogClose>
                  <p className="w-[150px] bg-black text-white p-2 rounded-md cursor-pointer">
                    Close
                  </p>
                </DialogClose>
                <Link href={`/summary/${articleId}`}>
                  <Button variant="outline" className="w-[150px]">
                    Cancel quiz
                  </Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-gray-600">
            Take a quick test about your knowledge from your content
          </h2>
        </div>

        <QuizContainer quizData={quizQuestions} articleId={articleId} />
      </div>
    </>
  );
}

export default QuizPage;
