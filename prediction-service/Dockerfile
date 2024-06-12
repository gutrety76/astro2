FROM python:3.9-slim

WORKDIR /usr/src/app

# Install necessary system packages including bash, netcat-openbsd, curl, and gnupg for key management
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    bash \
    dos2unix \
    curl \
    gnupg

# Install Ollama
RUN curl -sSL https://ollama.ai/install.sh | bash

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Convert scripts to Unix format
RUN dos2unix wait-for-it.sh
RUN dos2unix prediction.py

# Make wait-for-it script executable
RUN chmod +x wait-for-it.sh

# Expose the port the app runs on
EXPOSE 5000

# Create an entrypoint script to start Ollama and the Python app
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
