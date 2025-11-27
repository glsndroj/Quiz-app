import { query } from "@/lib/connectDB";
import { error } from "console";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await query("SELECT * FROM employees");
    console.log("RESPONSE!!!", error);

    return NextResponse.json(res.rows);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const POST = async (req: Request) => {
  try {
    const body = req.json();
    const res = await query(
      "INSERT INTO employees (id, firstname, lastname, age, gender, department, position, salary, hiredate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        "45",
        "Galsandorj",
        "Nyamdavaa",
        "33",
        "male",
        "engineering",
        "developer",
        3500,
        "2020-11-19",
      ]
    );
    console.log("RESPONSE: ", res);
    return NextResponse.json(res.rows);
  } catch (error) {
    console.log("Error: ", error);
  }
};
