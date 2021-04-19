from app import db
from flask import jsonify
"""
def get_name():
    return random.choice(["Alice", "Bob", "Chris", "Dolly"])
"""

def fetch_book():
    connection = db.connect()
    results = connection.execute("Select * from `book` limit 0, 3;").fetchall()
    connection.close()
    book_list = []
    """
    for item in results:
        one = {
            "title": item[17]
        }
        book_list.append(one)
    print(book_list) 
    """
    output = [dict(row) for row in results]
    return jsonify(output)

