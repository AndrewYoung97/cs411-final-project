from app import app
from flask import render_template, request, jsonify
from app import database as db_helper

@app.route("/")
def homepage():
    return db_helper.fetch_book()