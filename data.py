import os
import requests
import json


with open('data.txt') as f:
    src = f.read()    
 
    url = 'http://localhost:3000/d'
    newd  = { 'htmldata' : os.getcwd()+"/data.txt"  } 
  
    server = requests.post(url, data=newd)
    output = json.loads(server.text)   
    print(output)