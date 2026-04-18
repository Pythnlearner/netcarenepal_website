#!/bin/bash

# Configuration
DOMAIN="www.netcarenepal.com"
EMAIL="netcarenepal@gmail.com" # Update this
STAGING=0 # Set to 1 for testing (avoid rate limits)

if [ ! -d "certbot" ]; then
  mkdir -p certbot/conf
  mkdir -p certbot/www
fi

echo " Initializing SSL for $DOMAIN..."

# 1. Run certbot once to get the certificate
docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot \
    --email $EMAIL --agree-tos --no-eff-email \
    --staging $STAGING \
    -d $DOMAIN -d www.$DOMAIN

echo "♻️ Reloading Nginx..."
docker compose exec nginx nginx -s reload

echo "✅ SSL Initialization complete!"
