# Stage 1: Build the TypeScript code
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definition files
COPY package.json yarn.lock ./

# Install ALL dependencies (including devDependencies required for the build)
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript application to the 'dist' folder
RUN yarn build



# Stage 2: Production image (small image size)
FROM node:22-alpine

WORKDIR /app

# Copy dependency definition files
COPY package.json yarn.lock ./

# Install ONLY production dependencies and clean the yarn cache to save space
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Copy compiled javascript from the builder stage
COPY --from=builder /app/dist ./dist

# Create an images folder (in case app saves locally)
RUN mkdir images

# Expose the port the app runs on
EXPOSE 3000

# Start the application using Node directly to avoid invoking yarn
CMD ["node", "dist/server.js"]
