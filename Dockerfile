# Use a base image with Node.js
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src /app/src

# Compile TypeScript into JavaScript
RUN npm run build

# Expose the application port
EXPOSE 3000
# Define the command to run the application
CMD ["npm", "run", "start:dev"]