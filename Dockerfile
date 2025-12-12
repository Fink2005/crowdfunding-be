# Production stage (build already done in Jenkins)
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Create non-root user inside container
RUN adduser -D crowdfunding

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy pre-built app from Jenkins
COPY dist ./dist

# Switch to non-root user inside container
USER crowdfunding

# Expose container port
EXPOSE 8888

ENV PORT=8888

# Start app
CMD ["node", "dist/main.js"]
