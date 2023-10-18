import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

function exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
}

export async function GET(request, response){
    console.log('getting props...');

    const decoded = decodeURI(request.url);
    console.log(decoded);
    const word = decoded.split("word=")[1];

    try {
        const post = await prisma.charParse_charword.findFirstOrThrow({
            where: {
                simplified: word
            }
        })

        const postWithoutID = exclude(post, ['id'])
    
        const { id, traditional, simplified, english, pinyin } = postWithoutID;
    
        return Response.json(postWithoutID);

    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code == 'P2025') {
                //console.log(error)
                console.log("NO WORD FOUND")
                //return new Response({error: "could not find word"})
                //return NextResponse.json({error: 'cannot find word'}, {status: 404})
                return NextResponse.json({})
                //return new Response(JSON.stringify({error: "could not get word"}, {status: 500}, {message: "broken"}))
                //return Response.json({error: "Could not find word" + error, status:500, success: false})
                //console.log("no word found")
                //return new Response({status: 500})
                //return Response.json({ message: "An expected error occured" }, { status: 500 });
            }
        }}
    }