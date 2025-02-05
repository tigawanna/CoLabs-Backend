# Define build arguments
ARG NODE_VERSION=23
ARG PORT=5000

# Use Node.js Alpine image as the base
FROM node:${NODE_VERSION}-alpine AS base

# Update Alpine packages and install necessary dependencies
RUN apk update && apk add --no-cache gcompat

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Builder stage
FROM base AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lockfile first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build || true

# Final runner stage
FROM base AS runner

# Use the non-root user
USER nodejs

# Set working directory
WORKDIR /app

# Copy built artifacts from the builder stage
COPY --from=builder --chown=nodejs:nodejs /app .

# Expose the port
ARG PORT
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

# Start the application
CMD ["node", "dist/src/index.js"]
