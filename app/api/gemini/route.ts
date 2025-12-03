
import { NextRequest } from "next/server"

export default async function POST(req:NextRequest) {
    const text = await req.text();
    console.log(text)

    return
}

