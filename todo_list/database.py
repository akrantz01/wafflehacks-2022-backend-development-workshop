from dataclasses import dataclass
from typing import Optional

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db(app):
    """
    Connect SQLAlchemy to the Flask app
    """
    db.init_app(app)
    db.create_all(app=app)


@dataclass()
class Todo(db.Model):
    __tablename__ = "todos"

    id: int = db.Column(db.Integer, primary_key=True)
    summary: str = db.Column(db.Text, nullable=False)
    description: Optional[str] = db.Column(db.Text, nullable=True)
    complete: bool = db.Column(db.Boolean, nullable=False, default=False)
