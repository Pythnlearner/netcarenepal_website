#!/bin/bash

# Load Environment Variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Configuration
CONTAINER_NAME="netcare-mongo"
BACKUP_PATH="./netcare-mongo-backup/netcare-website"
MONGO_USER=${MONGO_ROOT_USER:-"admin"}
MONGO_PASS=${MONGO_ROOT_PASSWORD:-"Cont@ct@123"}
DB_NAME=${DB_NAME:-"netcare-website"}

echo "📂 Starting Database Restore..."

if [ ! -d "$BACKUP_PATH" ]; then
    echo "❌ Backup directory $BACKUP_PATH not found!"
    exit 1
fi

# 1. Copy backup files to the container
echo "📦 Copying backup files to container..."
docker cp $BACKUP_PATH $CONTAINER_NAME:/tmp/restore_db

# 2. Run mongorestore
echo "🔄 Restoring database..."
docker exec -i $CONTAINER_NAME mongorestore \
    --username=$MONGO_USER \
    --password=$MONGO_PASS \
    --authenticationDatabase=admin \
    --db=$DB_NAME \
    --drop \
    /tmp/restore_db

# 3. Clean up
echo "🧹 Cleaning up temporary files..."
docker exec -i $CONTAINER_NAME rm -rf /tmp/restore_db

echo "✅ Restore complete!"
