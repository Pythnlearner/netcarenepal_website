#!/bin/bash

# Configuration
PROJECT_DIR="/home/admin/netcare-website" # Update this to your project path on VPS
DOCKER_COMPOSE_FILE="docker-compose.yml"

echo "🚀 Starting Deployment..."

# Navigate to project directory
# cd $PROJECT_DIR || { echo "❌ Directory not found"; exit 1; }

# Pull latest changes (uncomment if you use git on VPS)
# echo "📥 Pulling latest changes from git..."
# git pull origin main

# Build and restart containers
echo "🏗️ Building and restarting containers..."
docker compose -f $DOCKER_COMPOSE_FILE up -d --build

# Clean up unused images/volumes
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment complete!"
echo "🌐 App is running at http://localhost:3000 (or your VPS IP/Domain)"
