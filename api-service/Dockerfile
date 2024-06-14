# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Install netcat-openbsd for wait-for-it script
RUN apt-get update && apt-get install -y netcat-openbsd dos2unix

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy wait-for-it script to the working directory
COPY wait-for-it.sh /usr/src/app/
#RUN dos2unix /usr/src/app/wait-for-it.sh

# Copy the rest of the application code to the working directory
COPY . .

# Make wait-for-it script executable
RUN chmod +x /usr/src/app/wait-for-it.sh

# Expose the port the app runs on
EXPOSE 3003

# Define the command to run the app with wait-for-it script

CMD ["npm", "run", "dev"]