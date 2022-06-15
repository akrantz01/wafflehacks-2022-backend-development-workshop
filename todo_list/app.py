from os import environ

from dotenv import load_dotenv
from flask import Flask

from . import lists, tags, todos
from .database import init_db

# Get all the environment variables from the .env file
load_dotenv()

app = Flask(__name__)

# Configure SQLAlchemy
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL", "").replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
init_db(app)

# Register the blueprints
app.register_blueprint(lists.app, url_prefix="/lists")
app.register_blueprint(tags.app, url_prefix="/tags")
app.register_blueprint(todos.app, url_prefix="/todos")
