from goodreads_app import app
from flask import render_template, request, jsonify, make_response
from goodreads_app.db_helper import *
from goodreads_app.error import Error

@app.errorhandler(Error)
def handle_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.route("/books")
def home():
    title = request.args.get('title')
    author = request.args.get('author')
    if not title and not author:
        return fetch_book()
    
@app.route("/books/<id>", methods=['PUT', 'DELETE'])
def handleBookByID(id):
    if request.method == 'PUT':
        data = request.get_json()
        update_book(data)
    if request.method == 'DELETE':
        # :TODO
        print(data)
    return make_response('Success', 200)

@app.route("/books/new", methods=['POST'])
def addBook():
    if request.method == 'POST':
        data = request.get_json()
        #add author before add the book, get the author id
        authorId = add_author(data['author'])
        data['author'] = authorId
        result = add_book(data)
        print(result)
    # :TODO
    return make_response('Success', 200)