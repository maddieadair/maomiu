from django.shortcuts import render
from django.http import HttpResponse
from .models import CharWord

list_of_dicts = []

# Create your views here.
with open('/Users/maddieadair/stroke-order-ws-gen/backend/charParse/cedict_ts.u8') as file:
    text = file.read()
    lines = text.split('\n')
    dict_lines = list(lines)

def parse_line(line):
    parsed = {}
    if line == '':
        dict_lines.remove(line)
        return 0
    
    line = line.rstrip('/')
    line = line.split('/')

    if len(line) <= 1:
        return 0
    
    english = '; '.join(line[1:])
    char_and_pinyin = line[0].split('[')
    characters = char_and_pinyin[0]
    characters = characters.split()
    traditional = characters[0]
    simplified = characters[1]
    pinyin = char_and_pinyin[1]
    pinyin = pinyin.rstrip()
    pinyin = pinyin.rstrip("]")
    parsed['traditional'] = traditional
    parsed['simplified'] = simplified
    parsed['pinyin'] = pinyin
    parsed['english'] = english
    list_of_dicts.append(parsed)

def remove_surnames():
    for x in range(len(list_of_dicts)-1, -1, -1):
        if "surname " in list_of_dicts[x]['english']:
            if list_of_dicts[x]['traditional'] == list_of_dicts[x+1]['traditional']:
                list_of_dicts.pop(x)
    
def index(request):
    #make each line into a dictionary
    print("Parsing dictionary . . .")
    for line in dict_lines:
            parse_line(line)
    
    #remove entries for surnames from the data (optional):

    #print("Removing Surnames . . .")
    #remove_surnames()

    print("Saving to database...")
    for one_dict in list_of_dicts:
        new_word = CharWord(traditional = one_dict["traditional"], simplified = one_dict["simplified"], english = one_dict["english"], pinyin = one_dict["pinyin"])
        new_word.save()
    
    #CharWord.objects.all().delete()

    #q = CharWord.objects.filter(simplified='漂亮').values()
    #print(q)



    return HttpResponse("Database successfully created.")