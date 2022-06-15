import re
from http import HTTPStatus

from flask import Blueprint, jsonify, request

from .database import db, List, Tag, Todo


TAG_FORMAT = re.compile(r"^[a-z0-9-]+$", re.MULTILINE)

app = Blueprint("todos", __name__)


def render(todo):
    return jsonify(
        id=todo.id,
        summary=todo.summary,
        description=todo.description,
        complete=todo.complete,
        list_id=todo.list_id,
        tags=[t.name for t in todo.tags],
    )


@app.get("")
def all():
    """
    Get a list of all todos in the database
    """
    return jsonify(
        [
            {
                "id": todo.id,
                "summary": todo.summary,
                "complete": todo.complete,
                "tags": [t.name for t in todo.tags],
            }
            for todo in Todo.query.all()
        ]
    )


@app.post("")
def create():
    """
    Create a new todo in the database
    """
    # Get the fields
    summary = request.json.get("summary")
    description = request.json.get("description")
    list_id = request.json.get("list")
    tag_names = request.json.get("tags")

    # Check all required fields are present
    if summary is None:
        return jsonify(message="field 'summary' is required"), HTTPStatus.BAD_REQUEST

    # Check the list exists
    if list_id is not None:
        if List.query.get(list_id) is None:
            return jsonify(message="list does not exist"), HTTPStatus.BAD_REQUEST

    # Build the todo item
    todo = Todo(summary=summary, description=description, list_id=list_id)

    # Insert it into the database
    db.session.add(todo)
    db.session.commit()

    return render(todo)


@app.get("/<int:id>")
def single(id):
    """
    Get all the information about a todo by its id
    """
    todo = Todo.query.get(id)

    # If the todo does not exist, return an error
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    return render(todo)


# This sentinel value is used to allow us to treat null as a distinct value.
# If we did not use this, we could not distinguish between null from a field not existing and null from a
# field explicitly set to null.
class _Sentinel:
    pass


@app.patch("/<int:id>")
def update(id):
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

    list_id = request.json.get("list", _Sentinel())
    if type(list_id) != _Sentinel:
        if list_id is not None and List.query.get(list_id) is None:
            return jsonify(message="list does not exist"), HTTPStatus.BAD_REQUEST

        todo.list_id = list_id

    complete = request.json.get("complete")
    if complete is not None:
        todo.complete = complete

    # Save any changes
    db.session.commit()

    return render(todo)


@app.put("/<int:id>/toggle")
def toggle(id):
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


@app.post("/<int:id>/tags")
def add_tag(id):
    """
    Add a tag to this todo, creating it if it doesn't exist
    """
    # Basic input validation
    name = request.args.get("name")
    if name is None:
        return jsonify(message="parameter 'name' is required"), HTTPStatus.BAD_REQUEST

    # Check the name has the correct format
    if TAG_FORMAT.fullmatch(name) is None:
        return jsonify(message="parameter 'name' has an invalid format"), HTTPStatus.BAD_REQUEST

    # Ensure the todo exists
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    # Get or create the tag
    tag = Tag.query.get(name)
    if tag is None:
        tag = Tag(name=name)

    # Associate the todo
    todo.tags.append(tag)
    db.session.commit()

    return render(todo)


@app.delete("/<int:id>/tags")
def delete_tag(id):
    """
    Delete a tag from this todo
    """
    # Basic input validation
    name = request.args.get("name")
    if name is None:
        return jsonify(message="parameter 'name' is required"), HTTPStatus.BAD_REQUEST

    # Ensure the todo exists
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    # We only need to do something if the tag exists
    tag = Tag.query.get(name)
    if tag is not None:
        try:
            todo.tags.remove(tag)
            db.session.commit()
        except ValueError:
            # A value error will be raised if the tag exists, but is not associated with the todo
            # We do not care about this case as it is effectively already removed
            pass

    return render(todo)


@app.delete("/<int:id>")
def delete(id):
    """
    Delete a todo by id
    """
    # Whether or not the todo exists is of no concern to us. If it doesn't exist, then we already fulfilled the user's
    # desired outcome
    Todo.query.filter_by(id=id).delete()
    db.session.commit()

    return "", HTTPStatus.NO_CONTENT
