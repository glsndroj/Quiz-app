import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return new Response(JSON.stringify({ message: "Missing Fields" }), {
        status: 400,
      });
    }
    const article = await prisma.article.create({
      data: { title, content },
    });
    console.log(article);
    return new Response(JSON.stringify(article), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
    });
  }
}

// export async function GET() {
//   const articles = await prisma.article.findMany();
//   return new Response(JSON.stringify(articles), { status: 200 });
// }

// export const GET = async () => {
//   try {
//     const res = await query("SELECT * FROM article");
//     console.log("RESPONSE!!!", error);

//     return NextResponse.json(res.rows);
//   } catch (error) {
//     console.log("ERROR", error);
//   }
// };

// export const PATCH = async (req: Request) => {
//   try {
//     const body = req.json();
//     const res = await query("UPDATE article SET ");
//     console.log("RESPONSE: ", res);
//     return NextResponse.json(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const DELETE = async (req: Request) => {
//   try {
//     const body = req.json();
//     const res = await query("DELETE FROM WHERE ");
//     console.log("RESPONSE: ", res);
//     return NextResponse.json(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
