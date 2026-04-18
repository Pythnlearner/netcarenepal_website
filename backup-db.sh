#!/bin/bash

# Load Environment Variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Configuration
CONTAINER_NAME="netcare-mongo"
BACKUP_DIR="./netcare-mongo-backup_new"
MONGO_USER=${MONGO_ROOT_USER:-"admin"}
MONGO_PASS=${MONGO_ROOT_PASSWORD:-"Cont@ct@123"}
DB_NAME=${DB_NAME:-"netcare-website"}

DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_NAME="backup_$DATE"

echo "💾 Starting Database Backup..."

# 1. Create backup inside container
echo "🏗️ Creating dump..."
docker exec -i $CONTAINER_NAME mongodump \
    --username=$MONGO_USER \
    --password=$MONGO_PASS \
    --authenticationDatabase=admin \
    --db=$DB_NAME \
    --out=/tmp/$BACKUP_NAME

# 2. Copy backup to host
echo "📦 Copying backup to host..."
mkdir -p $BACKUP_DIR
docker cp $CONTAINER_NAME:/tmp/$BACKUP_NAME $BACKUP_DIR/

# 3. Clean up container
echo "🧹 Cleaning up container..."
docker exec -i $CONTAINER_NAME rm -rf /tmp/$BACKUP_NAME

echo "✅ Backup complete! Saved to $BACKUP_DIR/$BACKUP_NAME"
