# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and tsconfig
COPY package.json pnpm-lock.yaml tsconfig.json ./

# Install ALL dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Create non-root user inside container
RUN adduser -D crowdfunding

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built app
COPY --from=builder /app/dist ./dist

# Switch to non-root user inside container
USER crowdfunding

# Expose container port
EXPOSE 8888

ENV PORT=8888

# Start app
CMD ["node", "dist/main.js"]
