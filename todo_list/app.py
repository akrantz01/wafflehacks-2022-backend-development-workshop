from http import HTTPStatus
from random import randint

from flask import Flask, jsonify, request

app = Flask(__name__)

todos = {}


@app.get("/todos")
def all_todos():
    return jsonify(list(todos.values()))


@app.post("/todos")
def create_todo():
    summary = request.json.get("summary")
    description = request.json.get("description")

    if summary is None:
        return jsonify({"message": "field 'summary' is required"}), HTTPStatus.BAD_REQUEST

    id = randint(0, 10000)
    entry = {"id": id, "summary": summary, "description": description, "complete": False}

    todos[id] = entry

    return jsonify(entry)


@app.get("/todos/<int:id>")
def single_todo(id):
    todo = todos.get(id)
    if todo is None:
        return jsonify({"message": "not found"}), HTTPStatus.NOT_FOUND

    return jsonify(todo)


class _Sentinel:
    pass


@app.patch("/todos/<int:id>")
def update_todo(id):
    todo = todos.get(id)
    if todo is None:
        return jsonify({"message": "not found"}), HTTPStatus.NOT_FOUND

    summary = request.json.get("summary")
    if summary is not None:
        todo["summary"] = summary

    description = request.json.get("description", _Sentinel())
    if type(description) != _Sentinel:
        todo["description"] = description

    return jsonify(todo)


@app.put("/todos/<int:id>/toggle")
def toggle_todo(id):
    todo = todos.get(id)
    if todo is None:
        return jsonify({"message": "not found"}), HTTPStatus.NOT_FOUND

    todo["complete"] = not todo["complete"]

    return jsonify({"complete": todo["complete"]})


@app.delete("/todos/<int:id>")
def delete_todo(id):
    del todos[id]

    return "", HTTPStatus.NO_CONTENT
