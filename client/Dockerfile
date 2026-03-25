#build stage
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Add build argument to inject the backend URL into the React build
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# Build the application
RUN yarn build


# PRODUCTION STAGE
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Install serve globally for serving the static files
RUN yarn global add serve

# Copy the build output from the builder stage and dump to ./dist folder
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]

