from http import HTTPStatus
import re

from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from .database import db, Tag, Todo


TAG_FORMAT = re.compile(r"^[a-z0-9-]+$", re.MULTILINE)

app = Blueprint("tags", __name__)


def render(tag):
    return jsonify(
        name=tag.name,
        todos=[
            {
                "id": todo.id,
                "summary": todo.summary,
                "complete": todo.complete,
                "list_id": todo.list_id,
                "tags": [t.name for t in todo.tags],
            }
            for todo in tag.todos
        ],
    )


@app.get("")
def all():
    """
    Get a list of all the tags
    """
    return jsonify([tag.name for tag in Tag.query.all()])


@app.post("")
def create():
    """
    Create a new tag
    """
    # Basic input validation
    name = request.json.get("name")
    todo_ids = request.json.get("todos")
    if name is None or todo_ids is None:
        return jsonify(message="missing at least 1 required field"), HTTPStatus.BAD_REQUEST

    # Ensure the name is the correct format
    if TAG_FORMAT.fullmatch(name) is None:
        return jsonify(message="field 'name' has an invalid format"), HTTPStatus.BAD_REQUEST

    # Ensure all the todos exist
    todos = [Todo.query.get(id) for id in todo_ids]
    if any(map(lambda t: t is None, todos)):
        return jsonify(message="all todos must exist"), HTTPStatus.BAD_REQUEST

    # Attempt to create the tag, updating it if it doesn't exist
    try:
        tag = Tag(name=name, todos=todos)
        db.session.add(tag)
        db.session.commit()
    except IntegrityError:
        # Undo the insertion
        db.session.rollback()

        # Find the tag
        tag = Tag.query.get(name)

        # Add the requested todos to the tag
        for todo in todos:
            tag.todos.append(todo)

        # Save the updates
        db.session.commit()

    return render(tag)


@app.get("/<string:name>")
def single(name):
    """
    Get all the details about a tag, including its associated todos
    """
    tag = Tag.query.get(name)
    if tag is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    return render(tag)


@app.delete("/<string:name>")
def delete(name):
    """
    Delete a tag by its name
    """
    Tag.query.filter_by(name=name).delete()
    db.session.commit()

    return "", HTTPStatus.NO_CONTENT
