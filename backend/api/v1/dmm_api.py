import requests
import json
import os
from dotenv import load_dotenv

def dmm(keyname):  
  load_dotenv()
  
  apikey = os.environ['API_KEY']
  keyword = str(keyname)
  url = 'https://api.dmm.com/affiliate/v3/ActressSearch?api_id={}&affiliate_id=protain37-999&offset=1&output=json&keyword={}'.format(apikey,keyword)

  res = requests.get(url)
  res_text = json.loads(res.text)
  res_list = res_text["result"]["actress"][0]
  
  if "imageURL" not in res_list:
    actorData = {
    'name': res_list['name'],
    'bust': res_list["bust"],
    'waist': res_list["waist"],
    'hip': res_list["hip"],
    'height': res_list["height"],
    'image': 'なし'
    }
    
    return actorData
  
  else:
    actorData = {
      'name': res_list['name'],
      'bust': res_list["bust"],
      'waist': res_list["waist"],
      'hip': res_list["hip"],
      'height': res_list["height"],
      'image': res_list["imageURL"]["large"]
      }
  
    return actorData
