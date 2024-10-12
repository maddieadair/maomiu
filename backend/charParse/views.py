from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import json

def helper(word):
    with open(settings.CEDICT_PATH) as file:
        lines = file.read().splitlines()

    for index, line in enumerate(lines):
        if ((line.split(" ",1)[0] == word) or (line.split(" ")[1] == word)):
            parsed = {}
            line = line.rstrip('/')
            line = line.split('/')
            
            english = '; '.join(line[1:])
            twoDefs = "; ".join(english.split("; ", 2)[:2])
            if (len(twoDefs) > 60):
                english = "; ".join(english.split("; ", 1)[:1])
            else:
                english = twoDefs
            print("english", english)

            char_and_pinyin = line[0].split('[')
            characters = char_and_pinyin[0]
            characters = characters.split()

            if word == characters[0]:
                print("trad")
                hanzi = characters[0]

            elif word == characters[1]:
                print("simp")
                hanzi = characters[1]

            pinyin = char_and_pinyin[1]
            pinyin = pinyin.rstrip()
            pinyin = pinyin.rstrip("]")

            if "surname " in english:
                print("lines[index+1].split(" ",1)[0]", lines[index+1].split(" ",1)[0])

                if ((hanzi == lines[index+1].split(" ",1)[0]) or (hanzi == lines[index+1].split(" ")[1])):
                    continue

            parsed['hanzi'] = hanzi
            parsed['pinyin'] = pinyin
            parsed['english'] = english

            return parsed
    return None
            
def findWord(word):
        try:
            result = helper(word)

            # if (result is None):
            #     simplifiedData = [helper(word, "simplified")]
            #     if (len(simplifiedData) is not None):
            #         return simplifiedData
            #     raise(TypeError)
            if (result is None):
                raise(TypeError)
            elif (len(result) > 1):
                print("EXCEPT: Multiple objects found")
            
            print("TRY: Character or word exists")
            return [result]
        except TypeError:
            result = None
            print("EXCEPT: Character or word does not exist")


def index(request):

    inputW = request.GET["word"]

    data = findWord(inputW)

    if (data is not None):

        if len(data) == 1:
            data = dict(data[0])
            json_data = json.dumps(data, ensure_ascii=False)

        elif len(data) > 1:
            new_data = data[0]
            json_data = json.dumps(new_data, ensure_ascii=False) 
      
        data = []
        new_data = []

        return JsonResponse(json_data,safe=False,json_dumps_params={'ensure_ascii':False})
    else:
        data = {}
        new_data = {}
        return HttpResponse("Character does not exist")