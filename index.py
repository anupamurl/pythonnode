import requests
import json
from selenium_pro import webdriver
# driver = webdriver.Start()

with open('readme.txt') as f:
    lines = f.read()       
    url = 'http://localhost:8080/a'
    form_data = {'htmldata': lines  }
    server = requests.post(url, data=form_data)
    output = json.loads(server.text)  
    my_list = []
    for index, item in enumerate(output):
    #  driver.get(item['link'])  
     fi = str(index) 
    # f=open( fi+".txt",'w') 
    #  src = driver.find_element_by_id('main-content').get_attribute('innerHTML') 
    # f.write(src)
     f=open(fi+".txt",'r').read()    
     print(f)
     urlb = 'http://localhost:8080/b'
     form_data = {'htmldata': f }
     server = requests.post(url, data=form_data)
     if index == 1:
        print(my_list)
        break
     

 

