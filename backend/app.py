from flask import Flask, request, Response
from werkzeug.middleware.proxy_fix import ProxyFix
from dotenv import load_dotenv
import os
import json

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)

load_dotenv()

PATH = os.environ.get("CEDICT_PATH")

def helper(word):
    with open(PATH, encoding='utf-8') as file:
        lines = file.read().splitlines()

    for index, line in enumerate(lines):
        if (line != '' and len(line.rstrip('/').split('/')) > 1):
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

                char_and_pinyin = line[0].split('[')
                characters = char_and_pinyin[0]
                characters = characters.split()

                if word == characters[0]:
                    hanzi = characters[0]

                elif word == characters[1]:
                    hanzi = characters[1]

                pinyin = char_and_pinyin[1]
                pinyin = pinyin.rstrip()
                pinyin = pinyin.rstrip("]")

                if "surname " in english:

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

            if (result is None):
                raise(TypeError)
            elif (len(result) > 1):
                print("EXCEPT: Multiple objects found")
            
            print("TRY: Character or word exists")
            return [result]
        except TypeError:
            result = None
            print("EXCEPT: Character or word does not exist")


@app.route("/")
def index():
    
    inputW = request.args.get('word', '')

    data = findWord(inputW)

    if (data is not None):

        if len(data) == 1:
            data = dict(data[0])
            jsonData = json.dumps(data, ensure_ascii=False)

        elif len(data) > 1:
            newData = data[0]
            jsonData = json.dumps(newData, ensure_ascii=False)
    
        data = []
        newData = []

        return Response(jsonData, status=200,  mimetype='application/json; charset=utf-8')
    else:
        data = {}
        newData = {}            
        return "Character does not exist"
