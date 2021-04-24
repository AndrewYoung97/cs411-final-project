# Run the program

First, install virtual environment named `.venv` 
`python -m venv .venv`

Then, activate the virtual environment
on linux:
`. venv/bin/activate`

on Windows:
`.venv\Scripts\activate`

Then, install dependencies in the virtual environment:
`python -m pip install -r ./requirements.txt`

Then run server with

`flask run`
or
`python -m flask run`

database connection is stored app.yaml, which should be in the same directory as main.py
OR
replace the environ variables with string
# Output

The return value from the server, aka what you should get from `locahlhost:5000` when you start the server is stored in the [output.txt](output.txt) file. You can try different queries.

# Misc
* db info is located at `__init__.py`

* interpreter python
https://code.visualstudio.com/docs/python/environments

* set environment variable on windows:
`$env:FLASK_APP="app"`
`$env:FLASK_DEBUG=1`

* TODO:

https://docs.sqlalchemy.org/en/14/orm/extensions/automap.html

task: 
* trigger idea: auto insert into `author` table when a book with a new author name is added.
* figure out the return type of the flask
* what is the return type of flask server/jsonify: https://stackoverflow.com/a/11884806/13284811



