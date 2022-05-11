from flask import Flask
from flask_cors import CORS,cross_origin
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": "*"}})

@app.route("/<pokemon>", methods = ["POST"])
@cross_origin()
def index(pokemon):
    page = requests.get("https://bulbapedia.bulbagarden.net/wiki/File:" + pokemon)
    soup = BeautifulSoup(page.content, 'html.parser')
    print(soup.find("div", class_="fullMedia").find("a"))
    return soup.find("div", class_="fullMedia").find("a")["href"]

if __name__=='__main__':
    app.run(host='localhost', port=8080, debug=True)