# Use Python as the base image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install watchdog for file watching
RUN pip install watchdog

# Copy the application code
COPY . .

# Command to run FastAPI with watchdog for hot-reloading
CMD ["watchmedo", "auto-restart", "--patterns=*.py", "--recursive", "--", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
