from goodreads_app import app
from flask import render_template, request, jsonify, make_response, abort
from goodreads_app.db_helper import *


@app.errorhandler(400)
def handle_error(error):
    return jsonify(error=str(error)), 400

@app.route("/books")
def home():
    try:
        #title = request.args.get('title')
        #author = request.args.get('author')
        #need to get json here
        #pass json
        result = search_book()
        if result is None:
            abort(400, "Fetch Failed")
    except TypeError as err:
        print(type(err))
        print(err.args)
    
@app.route("/books/<id>", methods=['PUT', 'DELETE'])
def handleBookByID(id):
    if request.method == 'PUT':
        data = request.get_json()
        result = update_book(data)
        if result == 0:
            abort(400, "Update failed")
    if request.method == 'DELETE':
        result = delete_book(id)
        if result == 0:
            abort(400, "Delete failed")
    return make_response('Success', 200)

@app.route("/books/new", methods=['POST'])
def addBook():
    if request.method == 'POST':
        data = request.get_json()
        #add author before add the book, get the author id
        authorId = add_author(data['author'])
        data['author'] = authorId
        result = add_book(data)
        if result == 0:
            abort(400, "Add failed")
    return make_response('Success', 200)