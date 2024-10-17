import { NextRequest, NextResponse } from "next/server";
require('dotenv').config()

export async function GET(request: NextRequest) {
  let decoded: string = decodeURI(request.url);
  let word: string = decoded.split("word=")[1];

  let urls: string[] = [];

  const apiURL = process.env.PYTHONANYWHERE_URL;
  
  urls.push(`${apiURL}${word}`);

  if (word.length > 1){
    for (let i = 0; i < word.length; i++) {
        urls.push(`${apiURL}${word[i]}`);
      }
  }

  return Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
    .then((data) => {
        return NextResponse.json({ data: data }, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json({ error: error }, { status: 404 });
    });
}
