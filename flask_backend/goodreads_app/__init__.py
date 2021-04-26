import os
from sqlalchemy import create_engine
from sqlalchemy.engine import url
from yaml import load, Loader
from flask import Flask

def init_connect_engine():
    if os.environ.get("GAE_ENV") != 'standard':
        variables = load(open("app.yaml"), Loader=Loader)
        env_variables = variables['env_variables']
        for var in env_variables:
            os.environ[var] = env_variables[var]

    pool = create_engine(
        url.URL(
            drivername="mysql+pymysql",
            username=os.environ.get('DB_USER'),
            password=os.environ.get('DB_PASS'),
            database=os.environ.get('DB_NAME'),
            host=os.environ.get('DB_HOST')
        )
    )
    
    return pool

db = init_connect_engine()

app = Flask(__name__)
# CORS(app)

from goodreads_app import routes
