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
        "33",
        "Ariuntuguldur",
        "Nyamdavaa",
        "17",
        "male",
        "engineering",
        "developer",
        5000,
        "2007-1-25",
      ]
    );
    console.log("RESPONSE: ", res);
    return NextResponse.json(res.rows);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = req.json();
    const res = await query(
      "UPDATE employees SET lastname = Doloo, age = 18, gender = Female, department = Engineering, position = Developer, salary = 100, hiredate = 2027.01.01 WHERE id = 19"
    );
    console.log("RESPONSE: ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = req.json();
    const res = await query("DELETE FROM employees WHERE id=1");
    console.log("RESPONSE: ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};
