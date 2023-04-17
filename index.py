import os
import requests
import json
from selenium_pro import webdriver
from selenium_pro.webdriver.support.ui import WebDriverWait
from selenium_pro.webdriver.support import expected_conditions as EC
from selenium_pro.webdriver.common.by import By
 
driver = webdriver.Start()
# driver.get('https://www.linkedin.com/jobs/search/?keywords=cyber%20security%20analyst')
# driver.find_element_by_pro('76KNymy0OD1r15G').click_pro()
# src = driver.find_element_by_class_name('jobs-search__results-list').get_attribute('innerHTML')

# # with open("keyword.txt",'w') as f:
# #  f.write(src)

with open('keyword.txt') as f:
    src = f.read()   

url = 'http://localhost:3000/a'
form_data = {'htmldata': src  }
server = requests.post(url, data=form_data)
output = json.loads(server.text)  

my_list = []
     #login Wiht id   
driver.get('https://www.linkedin.com') 
driver.find_element_by_pro('ISw3KbGf_HX0PLb').type('mailsofmanisha@yahoo.com')
driver.switch_to.active_element.type('Tab')
driver.find_element_by_pro('bWpxjgudeyUVu7V').type('Anupam@294')    
driver.switch_to.active_element.type('Enter') 

 

#login Wiht id       

for index, item in enumerate(output):
   # driver.get(item['link'])  
   # fi = str(index)         
   # data = driver.find_element_by_class_name('job-view-layout').get_attribute('innerHTML')    
 
   with open('joblayout.txt') as f:
    src = f.read()   
   
   headers = {
   'Content-Type': 'application/x-www-form-urlencoded'
   }
   
   
   urlb = 'http://localhost:3000/b'
   form_data = {'htmldata': src }     
   response = requests.request("POST", urlb, headers=headers, data=form_data) 
   my_list.append(json.loads(response.text))
   
   driver.get(my_list[index]['clink']+"/about") 
   
   #aboutsrc = driver.find_element_by_class_name('org-page-details-module__card-spacing').get_attribute('innerHTML') 
   
   aboutsrc = WebDriverWait(driver, 10).until(
     EC.presence_of_element_located((By.CLASS_NAME, "org-page-details-module__card-spacing"))
     )
      
      
   
   my_list[index]['about'] = aboutsrc.get_attribute('innerHTML') 
   driver.get(my_list[index]['clink']+"/people/?keywords=ceo") 
   element = WebDriverWait(driver, 10).until(
     EC.presence_of_element_located((By.CLASS_NAME, "org-people-profile-card__card-spacing"))
   )
   companyCeos = element.get_attribute('innerHTML') 
   my_list[index]['ceos'] = companyCeos
   
   with open("daatanew.txt",'w') as fil:
    fil.write( str(  my_list ))

   
   url = 'http://localhost:3000/d'
   
   
  #  newd = {'htmldata': my_list[index]  } 
  #  j = json.dumps(newd) 
  #  print(j)

   newd  = { 'htmldata' : os.getcwd()+"/daatanew.txt"  } 

   server = requests.post(url, data=newd)
   output = json.loads(server.text)     
   my_list[index].update(output)   
   if index == 0:    
    with open("final.txt",'w') as fil:
       fil.write(str(my_list) )
       break
     

     

 

