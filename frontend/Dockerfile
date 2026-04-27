# frontend/Dockerfile

# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
# Use 'npm ci' for production builds if package-lock.json is present, otherwise npm install is fine
RUN npm install 

# Copy source code and build the application
COPY . .
RUN npm run build 

# Stage 2: Serve the production build using a lightweight web server
FROM nginx:alpine

# Copy environment variables (optional)
ARG REACT_APP_API_URL

# Copy the built files from the build stage into Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx runs on port 80 by default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]