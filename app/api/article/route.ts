import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content } = body;

    const articles = await prisma.articles.create({
      data: { title, content },
    });
    revalidatePath("/");

    return NextResponse.json({ data: articles, status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      {
        status: 500,
      }
    );
  }
}

export const GET = async () => {
  try {
    const res = await prisma.articles.findMany();
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
