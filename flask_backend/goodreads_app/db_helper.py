from goodreads_app import db
from flask import jsonify
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text
from sqlalchemy.orm import Session 

"""
homepage search function, return book with given author name and title
"""
def fetch_book():
    try:
        connection = db.connect()
        results = connection.execute("SELECT * FROM goodread.newBookTab ORDER BY time_last_access desc limit 0, 10;").fetchall()
        print("back???2")
        connection.close()
        output = [dict(row) for row in results]

    except Exception as err:
        print(type(err))
        print(err.args)
        return None
    else:
        if output == []:
            return None
        return jsonify(output)


"""
search book based name and title, return None upon error
"""
def search_book(info):
    try:
        connection = db.connect()
        title = info['bookTitle']
        author = info['author']
        #print("title: " + title + " url: "+ url + " isbn: "+ str(isbn) + " author"+ str(author))
        #query = 'CALL search_book("{}", "{}");'.format(title, author)
        query = "CALL search_book(:t, :a);"
        params = {"t": title, "a": author}
        query_results = connection.execute(text(query), params)
        connection.close()
        query_results = [dict(x) for x in query_results]
    except Exception as err:
        print(type(err))
        print(err.args)
        return None
    else:
        if query_results == []:
            return None
        return jsonify(query_results)


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
    title = info['bookTitle']
    url = info['bookUrl']
    isbn = info['isbn']
    author = info['author']
    with Session(db) as session:
        session.begin()
        try:
            query = 'CALL add_book("{}", "{}", {}, {});'.format(title, url, isbn, author)
            result = session.execute(text(query)).all()
            result = result[0][0]
            print(result)
        except:
            session.rollback()
            #handle error in routes
            return 0
        else:
            session.commit()
            return 1

"""
update book book info with matching book id
"""
def update_book(info):
    try:
        connection = db.connect()
        id = info['bookId']
        title = info['bookTitle']
        url = info['bookUrl']
        isbn = info['isbn']
        author = info['author']
        authorId = add_author(author)
        query = 'UPDATE book SET title = "{}", authors = "{}", isbn="{}", url="{}" WHERE book_id = 36485538;'.format(title, authorId, isbn, url)
        query_results = connection.execute(query)
        connection.close()
        return 1
    except Exception as err:
        print(type(err))
        print(err.args)
        return 0

"""
delete book based on book ID
"""
def delete_book(id):
    try:
        connection = db.connect()
        query = 'DELETE FROM book WHERE book_id = {}'.format(id)
        query_results = connection.execute(query)
        connection.close()
        return 1
    except Exception as err:
        print(type(err))
        print(err.args)
        return 0