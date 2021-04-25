from goodreads_app import db
from flask import jsonify

def fetch_book():
    connection = db.connect()
    results = connection.execute("Select * from book JOIN author ON book.authors = author.author_id LIMIT 1;").fetchall()
    connection.close()
    output = [dict(row) for row in results]
    return jsonify(output)

def add_author(authorName):
    connection = db.connect()
