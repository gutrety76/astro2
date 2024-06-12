#!/bin/bash

# Start the Ollama server in the background
ollama serve &

# Wait for the Ollama server to start
sleep 10

# Start the wait-for-it script which then starts the Python application
./wait-for-it.sh rabbitmq 5672 -- python prediction.py
