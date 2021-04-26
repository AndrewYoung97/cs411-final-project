# Run the program

First, install virtual environment named `.venv` 
`python -m venv .venv`

Then, activate the virtual environment
on linux:
`. .venv/bin/activate`

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

* interpreter python for virtual env
https://code.visualstudio.com/docs/python/environments

* set environment variable on windows:
`$env:FLASK_APP="goodreads_app"`
`$env:FLASK_DEBUG=1`

or on linux
`export FLASK_APP=goodreads_app`
`export FLASK_ENV=development`

* TODO:
* sqlalchemy reference:
https://docs.sqlalchemy.org/en/14/core/tutorial.html

transaction with sqlalchemy api
https://docs.sqlalchemy.org/en/14/core/connections.html

(automap not implemented)
https://docs.sqlalchemy.org/en/14/orm/extensions/automap.html

task: 
* trigger idea: auto insert into `author` table when a book with a new author name is added.
* sqlalchemy exceptions example:
https://gist.github.com/edelooff/a3243d7967eaa9d2b665
* stored procedure example:
https://gist.github.com/danielz02/1a1c631a2090147feb73c5cd533cfc35


