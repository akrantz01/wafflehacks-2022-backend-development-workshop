from http import HTTPStatus
from random import randint

from flask import Flask, jsonify, request

app = Flask(__name__)

# This dictionary will store our todos by id, so we can retrieve them later
todos = {}


@app.get("/todos")
def all_todos():
    """
    Get a list of all todos in the database
    """
    return jsonify(list(todos.values()))


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
    id = randint(0, 10000)
    entry = {"id": id, "summary": summary, "description": description, "complete": False}

    # Insert it into the database
    todos[id] = entry

    return jsonify(entry)


@app.get("/todos/<int:id>")
def single_todo(id):
    """
    Get all the information about a todo by its id
    """
    todo = todos.get(id)

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
    todo = todos.get(id)
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    summary = request.json.get("summary")
    if summary is not None:
        todo["summary"] = summary

    description = request.json.get("description", _Sentinel())
    if type(description) != _Sentinel:
        todo["description"] = description

    complete = request.json.get("complete")
    if complete is not None:
        todo["complete"] = complete

    return jsonify(todo)


@app.put("/todos/<int:id>/toggle")
def toggle_todo(id):
    """
    Toggle the completion status of the todo
    """
    todo = todos.get(id)
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    # Invert the status
    todo["complete"] = not todo["complete"]

    # Return the new status
    return jsonify(complete=todo["complete"])


@app.delete("/todos/<int:id>")
def delete_todo(id):
    """
    Delete a todo by id
    """
    # Whether or not the todo exists is of no concern to us. If it doesn't exist, then we already fulfilled the user's
    # desired outcome
    try:
        del todos[id]
    except KeyError:
        pass

    return "", HTTPStatus.NO_CONTENT
