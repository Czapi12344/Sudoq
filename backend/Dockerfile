FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install watchdog

COPY . .

CMD ["watchmedo", "auto-restart", "--patterns=*.py", "--recursive", "--", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
