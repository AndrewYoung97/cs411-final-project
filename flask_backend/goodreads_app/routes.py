from goodreads_app import app
from flask import render_template, request, jsonify, make_response
from goodreads_app.db_helper import *

@app.route("/books")
def home():
    return fetch_book()

@app.route("/books/<id>", methods=['PUT', 'DELETE'])
def handleBookByID(id):
    print(id)
    if request.method == 'PUT':
        data = request.get_json()
        # :TODO
        print(data)
    if request.method == 'DELETE':
        # :TODO
        print(data)
    return make_response('Success', 200)

@app.route("/books/new", methods=['POST'])
def addBook():
    data = request.get_json()
    # print(data)
    # :TODO
    return make_response('Success', 200)