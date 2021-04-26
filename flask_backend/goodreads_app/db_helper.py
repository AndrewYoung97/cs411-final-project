from goodreads_app import db
from flask import jsonify
from sqlalchemy.exc import IntegrityError

def fetch_book():
    connection = db.connect()
    results = connection.execute("Select * from book JOIN author ON book.authors = author.author_id LIMIT 1;").fetchall()
    connection.close()
    output = [dict(row) for row in results]
    return jsonify(output)

"""
Take author name and add to author table, return new author ID if insert toke place, otherwise return exisiting ID
"""
def add_author(authorName):
    try:
        connection = db.connect()
        query = 'INSERT INTO author(author_id, author_name) values(null,"{}");'.format(authorName)
        connection.execute(query)
    #duplicate author_name cannot be inserted
    except IntegrityError:
        queryAuthorID = 'SELECT author_id FROM author WHERE author_name = "{}";'.format(authorName)
        query_results = connection.execute(queryAuthorID)
        query_results = [x for x in query_results]
        author_id = query_results[0][0]
    else:
        query_results = connection.execute("SELECT LAST_INSERT_ID();")
        query_results = [x for x in query_results]
        author_id = query_results[0][0]
        connection.close()
    return author_id

"""
call a stored procedure to add books, return 1 if action toke place, 0 if book title already in the database
"""
def add_book(info):
    try:
        connection = db.connect()
        title = info['bookTitle']
        url = info['bookUrl']
        isbn = info['isbn']
        author = info['author']
        #print("title: " + title + " url: "+ url + " isbn: "+ str(isbn) + " author"+ str(author))
        query = 'CALL add_book("{}", "{}", {}, {});'.format(title, url, isbn, author)
        #print(query)
        query_results = connection.execute(query)
        connection.close()
        query_results = [x for x in query_results]
        result = query_results[0][0]
    except Exception as err:
        print(type(err))
        print(err.args)
    return result
