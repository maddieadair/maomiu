import { NextRequest, NextResponse } from "next/server";

export async function POST(request, response) {
  const res = await request.formData()
  console.log("request body",res)
  console.log("type:",typeof(res))

  return NextResponse.json(res)
}