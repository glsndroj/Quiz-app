import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function DELETE(
  req: NextRequest,
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

    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: `Article with ID ${articleId} not found.` },
        { status: 404 }
      );
    }

    const deletedArticle = await prisma.article.delete({
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

export async function PATCH(req: Request) {
  try {
    const { body } = await req.json();
    const { id, title, content } = body;
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Article ID is required!" }),
        { status: 400 }
      );
    }
    const updateArticle = await prisma.article.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title || undefined,
        content: content || undefined,
      },
    });
    return new Response(JSON.stringify(updateArticle), { status: 200 });
  } catch (error) {
    console.error("Error updating article: ", error);
    return new Response(JSON.stringify({ error: "Failed to update article" }), {
      status: 500,
    });
  }
}
