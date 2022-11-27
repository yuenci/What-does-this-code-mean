#!/usr/bin/env python3
from flask_cors import CORS
from flask import Flask, request
import openai

API = ""


app = Flask(__name__)
CORS(app, resources=r'/*')


@app.route('/response', methods=["POST"])
def postExplainToCache():
    jsonData = request.json
    sentence = jsonData["sentences"]
    return chat(sentence)



def chat(messageList):
    openai.api_key =API

    message = messageList  + "/n Explain the code in plain language."
    print(message)


    response = openai.Completion.create(
        #model="text-curie-001",
        model="text-davinci-002",
        prompt=message,
        temperature=0,
        max_tokens=60,
        top_p=1,
        frequency_penalty=0.5,
        presence_penalty=0
    )
    response = response["choices"][0]["text"].replace("\n","")
	

    return {"response": response}


if __name__ == '__main__':
    app.run(debug=True, host='', port="")