import { PrismaClient } from "@/lib/generated/prisma/client";
import { count } from "console";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    const articles = await prisma.article.create({
      data: { title, content },
    });
    revalidatePath("/");

    return new Response(JSON.stringify(articles), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
      status: 500,
    });
  }
}
