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
        results = connection.execute("SELECT b.book_id, a.author_name, b.title, b.image_url, b.isbn, b.review_count, b.avg_rating , b.time_last_access FROM author a JOIN newBookTab b ON a.author_id = b.authors WHERE a.author_id = b.authors GROUP BY b.book_id HAVING b.time_last_access > DATE_ADD(MAX(b.time_last_access), INTERVAL -7 DAY) ORDER BY num_access DESC LIMIT 0, 15;").fetchall()
        connection.close()
        output = [dict(row) for row in results]
    except Exception as err:
        print(type(err))
        print(err.args)
        return None
    if output == []:
        return None
    print(output)
    return jsonify(output)


"""
search book based name and title, return None upon error
"""
def search_book(title, author):
    try:
        connection = db.connect()
        #print("title: " + title + " url: "+ url + " isbn: "+ str(isbn) + " author"+ str(author))
        #query = 'CALL search_book("{}", "{}");'.format(title, author)
        query = "CALL get_book(:a, :t);"
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

def search_bookID(id):
    connection = db.connect()
    query = 'SELECT a.author_name, b.title, b.image_url, b.isbn, b.review_count, b.avg_rating FROM author a JOIN book b ON a.author_id = b.authors WHERE b.book_id = "{}";'.format(id)
    query_results = connection.execute(query)
    # print([dict(row) for row in query_results][0])
    output = [dict(row) for row in query_results][0]
    print(output)
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