from flask import Flask
from flask_cors import CORS,cross_origin
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
from colorthief import ColorThief

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": "*"}})

@app.route("/<pokemon>", methods = ["POST"])
@cross_origin()
def index(pokemon):
    page = requests.get("https://bulbapedia.bulbagarden.net/wiki/File:" + pokemon)
    soup = BeautifulSoup(page.content, 'html.parser')
    url = soup.find("div", class_="fullImageLink").find("img")["src"]
    img_response = requests.get("https://" + url[2:], stream=True)
    color_thief = ColorThief(BytesIO(img_response.content))
    dominant_color = color_thief.get_color(quality=1)
    return {"url":url, "color": dominant_color}

if __name__=='__main__':
    app.run(host='localhost', port=8081, debug=True)