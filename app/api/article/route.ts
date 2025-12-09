import prisma from "@/lib/prisma";
import { generateQuiz } from "@/utils/generateQuiz";
import { generateSummary } from "@/utils/generateSummary";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    const summaryText = await generateSummary(content);

    if (!summaryText || summaryText.trim().length < 10) {
      throw new Error("AI failed to generate a valid summary text.");
    }

    const quizQuestions = await generateQuiz(content);

    const articles = await prisma.articles.create({
      data: { title, content, summary: summaryText },
    });

    for (const q of quizQuestions) {
      const correctLetter = q.correct_answer.charAt(0);

      const cleanOption = (option: string) => {
        const match = option.match(/^[A-D]\) /);
        if (match) {
          return option.substring(match[0].length).trim();
        }
        return option.trim();
      };

      const cleanedOptions = q.options.map(cleanOption);
      await prisma.quiz.create({
        data: {
          articlesId: articles.id,
          questionText: q.question,
          correctAnswer: correctLetter,
          optionA: cleanedOptions[0],
          optionB: cleanedOptions[1],
          optionC: cleanedOptions[2],
          optionD: cleanedOptions[3],
        },
      });
    }
    revalidatePath("/");

    return NextResponse.json({
      data: articles,
      quizCount: quizQuestions.length,
      status: 201,
    });
  } catch (error) {
    console.error("Quiz POST Error: ", error);

    return NextResponse.json(
      { error: "Failed to create article/quiz: " + String(error) },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  try {
    const res = await prisma.articles.findMany({
      include: { quizzes: true },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles due to an internal server issue." },
      { status: 500 }
    );
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = parseInt(params.id);

    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: "Invalid article ID!" },
        { status: 400 }
      );
    }

    const existingArticle = await prisma.articles.findUnique({
      where: { id: articleId },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: `Article with ID ${articleId} not found.` },
        { status: 404 }
      );
    }

    const deletedArticle = await prisma.articles.delete({
      where: {
        id: articleId,
      },
    });
    console.log("DELETED", deletedArticle);

    return NextResponse.json(deletedArticle, { status: 200 });
  } catch (error) {
    console.error("Error during deletion process: ", error);

    return NextResponse.json(
      { error: "Failed to delete article due to an internal server issue." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, title, content } = await req.json();
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Article ID is required!" }),
        { status: 400 }
      );
    }
    const updateArticle = await prisma.articles.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title || undefined,
        content: content || undefined,
      },
    });
    return NextResponse.json(updateArticle, { status: 200 });
  } catch (error) {
    console.error("Error updating article: ", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}
