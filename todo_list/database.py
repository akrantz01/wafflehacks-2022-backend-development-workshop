from dataclasses import dataclass
from os import environ
from sqlite3 import Connection as Sqlite3Connection
from typing import List as ListT, Optional

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event

db = SQLAlchemy()


def _set_sqlite_pragma(connection, _record):
    """
    Enables foreign key constraints on sqlite database connections. This is required as sqlite does not support
    foreign key constraints by default, and they must be enabled per-connection.
    """
    if isinstance(connection, Sqlite3Connection):
        cursor = connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()


def init_db(app):
    """
    Connect SQLAlchemy to the Flask app
    """
    db.init_app(app)

    # Add the event listener for automatically enabling foreign key constraints
    with app.app_context():
        event.listen(db.engine, "connect", _set_sqlite_pragma)

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
