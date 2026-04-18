# VPS Deployment Guide

This repository is configured for Docker deployment.

## Prerequisites
- Docker and Docker Compose installed on your VPS.
- Your domain `www.netcarenepal.com` and `netcarenepal.com` pointing to your VPS IP.

## Deployment Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pythnlearner/netcarenepal_website.git
   cd netcarenepal_website
   ```

2. **Initialize SSL**:
   Before running the full stack, you need to generate the SSL certificates.
   
   **Note**: For the very first run, you might need to comment out the `listen 443` block in `nginx/conf.d/default.conf` if Nginx fails to start without certificates.
   
   ```bash
   chmod +x init-ssl.sh
   ./init-ssl.sh
   ```

3. **Deploy everything**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## Nginx and SSL
- The stack uses Nginx as a reverse proxy.
- Certbot automatically renews certificates every 12 hours.
- Path to certificates: `./certbot/conf`

## Database Backup & Restore

### Restoring from an existing backup
I have created a script that restores the database from your `netcare-mongo-backup` folder:
```bash
chmod +x restore-db.sh
./restore-db.sh
```
*Note: This will overwrite (drop) any existing data in the `netcare-website` database.*

### Taking a new backup
To manually back up your data at any time:
```bash
chmod +x backup-db.sh
./backup-db.sh
```
*Backups will be saved to the `./netcare-mongo-backup_new` directory.*

## MongoDB Notes
- Root User: `admin`
- Password: `Cont@ct@123`
- Database Name: `netcare-website`
- Data Persistence: MongoDB data is stored in a Docker volume named `netcare-db-data`.

## Accessing the App
The app will be accessible on port `3000`. If you are using a custom domain, you should set up an Nginx reverse proxy to forward traffic from port 80/443 to port 3000.
