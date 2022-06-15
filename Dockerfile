ARG PYTHON_VERSION=3.9-slim

FROM python:${PYTHON_VERSION}

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-venv \
    python3-dev \
    python3-setuptools \
    python3-wheel

RUN mkdir -p /app
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./todo_list ./todo_list

EXPOSE 8080

CMD ["gunicorn", "--bind", ":8080", "--workers", "2", "--access-logfile", "-", "todo_list:app"]
