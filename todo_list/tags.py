from http import HTTPStatus

from flask import Blueprint, jsonify

from .database import db, Tag


app = Blueprint("tags", __name__)


def render(tag):
    return jsonify(
        name=tag.name,
        todos=[
            {
                "id": todo.id,
                "summary": todo.summary,
                "complete": todo.complete,
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
