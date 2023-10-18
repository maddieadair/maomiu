from django.shortcuts import render
from django.http import HttpResponse#, JsonResponse
from charParse.models import CharWord
import json

# Create your views here.

def index(request):
    '''q = CharWord.objects.filter(simplified='银行').first()
    print(q.details())
    print(type(q), '\n')'''

    #data = list(CharWord.objects.filter(simplified='京剧').values())
    
    '''unicodeData= {
    "string1": "明彦",
    "string2": u"\u00f8"
}'''
    '''encodedUnicode = json.dumps(unicodeData, ensure_ascii=False) # use dump() method to write it in file
    print(encodedUnicode)
    print("json loads", json.loads(encodedUnicode))
    #json_data = json.dumps(list(data)).encode('utf-8')'''
    
    inputW = input('Enter a character: ')
    print("inputW: ", inputW)

    '''resu = CharWord.objects.filter(simplified='邮局').first()
    print('resu: ', resu)'''

    try:
        data = CharWord.objects.get(simplified=inputW)
        data = CharWord.objects.filter(simplified=inputW).values() #get rid of this and change above and below to results if removed
        print("results: ", data)
        print("TRY: Character or word exists")
    except CharWord.DoesNotExist:
        data = None
        print("EXCEPT: Character or word does not exist")
    except CharWord.MultipleObjectsReturned:
        data = CharWord.objects.filter(simplified=inputW).values()
        print(data)
        print("EXCEPT: Multiple objects found")
        #print("Multiple results ", results)


    if (data is not None):
        #print("Character/word exists!")
        #data = CharWord.objects.filter(simplified=inputW).values()
        data = list(data)
        print("DATA LENGTH", len(data))
        print(type(data))
        print("DATA", data)

        if len(data) == 1:
            data = dict(data[0])
            print("DATA DICT TYPE: ", type(data), '\n')
            print("DATA DICT: ", data, '\n')
            print("TRADITIONAL", data['traditional'], '\n')
            json_data = json.dumps(data, ensure_ascii=False) # use dump() method to write it in file

        elif len(data) > 1:
            new_data = {}
            new_data['traditional'] = []
            new_data['simplified'] = data[0]["simplified"]
            new_data['pinyin'] = []
            new_data['english'] = []

            for i in data:
                new_data['traditional'].append(i['traditional'])
                new_data['english'].append(i['english'])
                new_data['pinyin'].append(i['pinyin'])

            print("NEW DATA", new_data, '\n')
            json_data = json.dumps(new_data, ensure_ascii=False) # use dump() method to write it in file

        
        print("DATA", data, '\n')


        print("json data", json_data, '\n')
        print("json loads", json.loads(json_data), '\n')

        #return JsonResponse(data,safe=False,json_dumps_params={'ensure_ascii':False})
        return HttpResponse(json_data)
        #return HttpResponse(encodedUnicode, content_type='application/json')
    else:
        #print("Character/Word does not Exist!")
        return HttpResponse("Character does not exist")
    
    '''newdata = dict(data[2])
    print('type of data[0]', type(newdata), '\n')
    print(newdata['english'])'''