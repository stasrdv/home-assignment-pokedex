FROM python:3.8-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    python3-dev \
    gcc

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 8080

CMD ["python", "app.py"]
