# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and tsconfig
COPY package*.json tsconfig.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Create non-root user inside container
RUN adduser -D crowdfunding

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built app
COPY --from=builder /app/dist ./dist

# Switch to non-root user inside container
USER crowdfunding

# Expose container port
EXPOSE 8888

ENV PORT=8888

# Start app
CMD ["node", "dist/main.js"]
