import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  let decoded: string = decodeURI(request.url);
  let word: string = decoded.split("word=")[1];

  let urls: string[] = [];

  for (let i = 0; i < word.length; i++) {
    urls.push(
      `https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/${word[i]}.json`
    );
  }

  return Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
    .then((data: any) => {
      return NextResponse.json({ data: data }, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json(
        { error: "Could not find stroke info" },
        { status: 404 }
      );
    });
}
