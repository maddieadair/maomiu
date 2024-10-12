import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let decoded: string = decodeURI(request.url);
  let word: string = decoded.split("word=")[1];

  let urls: string[] = [];
  
  urls.push(`http://127.0.0.1:8000/charParse/?word=${word}`);

  if (word.length > 1){
    for (let i = 0; i < word.length; i++) {
        urls.push(`http://127.0.0.1:8000/charParse/?word=${word[i]}`);
      }
  }

  return Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
    .then((data) => {
        return NextResponse.json({ data: data }, { status: 200 });
    })
    .catch((error) => {
      return NextResponse.json({ error: "Character data could not be found" }, { status: 404 });
    });
}
