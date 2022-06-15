from dataclasses import dataclass
from os import environ
from typing import List as ListT, Optional

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db(app):
    """
    Connect SQLAlchemy to the Flask app
    """
    db.init_app(app)

    # Allow resetting the database
    reset = environ.get("DATABASE_RESET", "").lower()
    if reset == "1" or reset == "y" or reset == "t":
        db.drop_all(app=app)

    db.create_all(app=app)


@dataclass()
class Todo(db.Model):
    __tablename__ = "todos"

    id: int = db.Column(db.Integer, primary_key=True)
    summary: str = db.Column(db.Text, nullable=False)
    description: Optional[str] = db.Column(db.Text, nullable=True)
    complete: bool = db.Column(db.Boolean, nullable=False, default=False)

    list_id: int = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=True)


@dataclass()
class List(db.Model):
    __tablename__ = "lists"

    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.Text, nullable=False)

    todos: ListT["Todo"] = db.relation("Todo", backref="list", lazy=True)
