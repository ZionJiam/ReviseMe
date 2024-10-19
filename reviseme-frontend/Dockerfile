# Use the official Node.js image.
FROM node:18

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code to the container.
COPY . .

# Build the React app for production.
RUN npm run build

# Use a lightweight server to serve the frontend.
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for the frontend.
EXPOSE 80

# Start nginx server.
CMD ["nginx", "-g", "daemon off;"]
