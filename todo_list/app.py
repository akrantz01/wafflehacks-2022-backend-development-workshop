from os import environ

from dotenv import load_dotenv
from flask import Flask

from . import todos
from .database import init_db

# Get all the environment variables from the .env file
load_dotenv()

app = Flask(__name__)

# Configure SQLAlchemy
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
init_db(app)

# Register the blueprints
app.register_blueprint(todos.app, url_prefix="/todos")
