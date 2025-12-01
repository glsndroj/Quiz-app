import { query } from "@/lib/connectDB";
import { error } from "console";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await query("SELECT * FROM article");
    console.log("RESPONSE!!!", error);

    return NextResponse.json(res.rows);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const POST = async (req: Request) => {
  const { body } = await req.json();
  try {
    const article =
      await query(`INSERT INTO article (title, content, summary) VALUES (

  
 `);
    console.log("RESPONSE: ", article);
    return NextResponse.json(article);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = req.json();
    const res = await query("UPDATE article SET ");
    console.log("RESPONSE: ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = req.json();
    const res = await query("DELETE FROM WHERE ");
    console.log("RESPONSE: ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};
