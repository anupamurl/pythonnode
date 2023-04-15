import requests
import json


with open('finaldata.txt') as f:
    src = f.read()   

url = 'http://localhost:3000/d'
form_data = {'htmldata': src  }
server = requests.post(url, data=form_data)
output = json.loads(server.text)  

print("---------------")
print(output)
print("---------------")


