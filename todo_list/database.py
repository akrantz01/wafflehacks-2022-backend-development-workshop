from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init(app):
    """
    Connect SQLAlchemy to the Flask app
    """
    db.init_app(app)
    db.create_all(app=app)
