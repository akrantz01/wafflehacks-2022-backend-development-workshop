from http import HTTPStatus

from flask import Blueprint, jsonify, request

from .database import db, List, Todo


app = Blueprint("lists", __name__)


def render(list):
    return jsonify(
        {
            "id": list.id,
            "name": list.name,
            "todos": [{"id": todo.id, "summary": todo.summary, "complete": todo.complete} for todo in list.todos],
        }
    )


@app.get("")
def all():
    """
    Get a list of all the lists
    """
    return jsonify(
        [
            {
                "id": list.id,
                "name": list.name,
            }
            for list in List.query.all()
        ]
    )


@app.post("")
def create():
    """
    Create a new list
    """
    # Some basic input validation
    name = request.json.get("name")
    todo_ids = request.json.get("todos")
    if name is None or todo_ids is None:
        return jsonify(message="missing at least 1 required field"), HTTPStatus.BAD_REQUEST

    # Ensure all the todos exist
    todos = [Todo.query.get(id) for id in todo_ids]
    if any(map(lambda t: t is None, todos)):
        return jsonify(message="all todo must exist"), HTTPStatus.BAD_REQUEST

    # Create the list
    list = List(name=name, todos=todos)
    db.session.add(list)
    db.session.commit()

    return render(list)


@app.get("/<int:id>")
def single(id):
    """
    Get all the details about a list, including its todos
    """
    list = List.query.get(id)
    if list is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    return render(list)


@app.patch("/<int:id>")
def update(id):
    """
    Change the individual fields of a list
    """
    list = List.query.get(id)
    if list is None:
        return jsonify(message="not found"), HTTPStatus.NOT_FOUND

    # Update the name if present
    name = request.json.get("name")
    if name is not None:
        list.name = name

    # Save the changes
    db.session.commit()

    return render(list)


@app.delete("/<int:id>")
def delete(id):
    """
    Delete a list by id
    """
    List.query.filter_by(id=id).delete()
    db.session.commit()

    return "", HTTPStatus.NO_CONTENT
