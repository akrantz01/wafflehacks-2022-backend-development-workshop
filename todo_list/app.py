from http import HTTPStatus
from os import environ

from dotenv import load_dotenv
from flask import Flask, jsonify, request

from .database import db, init_db, Todo

# Get all the environment variables from the .env file
load_dotenv()

app = Flask(__name__)

# Configure SQLAlchemy
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
init_db(app)


@app.get("/todos")
def all_todos():
    """
    Get a list of all todos in the database
    """
    return jsonify(
        [
            {
                "id": todo.id,
                "summary": todo.summary,
                "complete": todo.complete,
            }
            for todo in Todo.query.all()
        ]
    )


@app.post("/todos")
def create_todo():
    """
    Create a new todo in the database
    """
    # Get the fields
    summary = request.json.get("summary")
    description = request.json.get("description")

    # Check all required fields are present
    if summary is None:
        return jsonify(message="field 'summary' is required"), HTTPStatus.BAD_REQUEST

    # Build the todo item
    todo = Todo(summary=summary, description=description)

    # Insert it into the database
    db.session.add(todo)
    db.session.commit()

    return jsonify(todo)


@app.get("/todos/<int:id>")
def single_todo(id):
    """
    Get all the information about a todo by its id
    """
    todo = Todo.query.get(id)

    # If the todo does not exist, return an error
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    return jsonify(todo)


# This sentinel value is used to allow us to treat null as a distinct value.
# If we did not use this, we could not distinguish between null from a field not existing and null from a
# field explicitly set to null.
class _Sentinel:
    pass


@app.patch("/todos/<int:id>")
def update_todo(id):
    """
    Change the individual fields of a todo
    """
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    summary = request.json.get("summary")
    if summary is not None:
        todo.summary = summary

    description = request.json.get("description", _Sentinel())
    if type(description) != _Sentinel:
        todo.description = description

    complete = request.json.get("complete")
    if complete is not None:
        todo.complete = complete

    # Save any changes
    db.session.commit()

    return jsonify(todo)


@app.put("/todos/<int:id>/toggle")
def toggle_todo(id):
    """
    Toggle the completion status of the todo
    """
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    # Invert the status
    todo.complete = not todo.complete

    # Save any changes
    db.session.commit()

    # Return the new status
    return jsonify(complete=todo.complete)


@app.delete("/todos/<int:id>")
def delete_todo(id):
    """
    Delete a todo by id
    """
    # Whether or not the todo exists is of no concern to us. If it doesn't exist, then we already fulfilled the user's
    # desired outcome
    Todo.query.filter_by(id=id).delete()
    db.session.commit()

    return "", HTTPStatus.NO_CONTENT
