import os
import sqlalchemy 
from yaml import load, Loader
from flask import Flask


# Base = automap_base() 


def init_connect_engine():
    if os.environ.get("GAE_ENV") != 'standard':
        variables = load(open("app.yaml"), Loader=Loader)
        env_variables = variables['env_variables']
        for var in env_variables:
            os.environ[var] = env_variables[var]

    pool = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username=os.environ.get('DB_USER'),
            password=os.environ.get('DB_PASS'),
            database=os.environ.get('DB_NAME'),
            host=os.environ.get('DB_HOST')
        )
    )
    return pool

db = init_connect_engine()
"""
Base.prepare(db, reflect=True)

Book = Base.classes.actor

session = Session(db)

session.add(Book(first_name="Facebook"))
session.commit()
"""

app = Flask(__name__)

from app import routes
