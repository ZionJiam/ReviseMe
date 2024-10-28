# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of your application code
COPY . .

# Expose both ports
EXPOSE 5002 5003

# Use PM2 to start both applications
CMD ["pm2-runtime", "start", "server.js", "--name", "mainService", "--watch", "&&", "pm2", "start", "authService.js", "--name", "authService", "--watch"]
