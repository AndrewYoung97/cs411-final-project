# Run the program

First, activate the virtual environment

on linux:
`. venv/bin/activate`
on Windows:
`.venv\Scripts\activate`

Then run flask with

`flask run`
or
`python -m flask run`

database connection is stored app.yaml, which should be in the same directory as main.py
OR
use replace the environ variables with string
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
figure out the best way to work with complex query
figure out the return type of the flask
what is the return type of flask server/jsonify: https://stackoverflow.com/a/11884806/13284811



