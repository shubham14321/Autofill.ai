# Autofill.Ai - Self-Hosting Deployment Guide

## Overview
This guide will help you deploy your Autofill.Ai application on your own web hosting server.

## Prerequisites
- Node.js 18+ installed on your server
- PostgreSQL database (or use Neon Database for serverless)
- Web server with SSL support (Apache/Nginx)
- Firebase project with authentication enabled

## Step 1: Server Setup

### Option A: Using Traditional Web Hosting (Shared/VPS)
1. Upload all project files to your server
2. Install Node.js dependencies:
```bash
npm install
```

### Option B: Using Cloud Platforms (Recommended)
- **Vercel**: Perfect for this stack, automatic deployments
- **Netlify**: Good for static sites with serverless functions
- **Railway**: Full-stack hosting with database support
- **Render**: Simple deployment with PostgreSQL support

## Step 2: Database Configuration

### Option A: PostgreSQL on your server
1. Create a PostgreSQL database
2. Set your DATABASE_URL environment variable:
```
DATABASE_URL=postgresql://username:password@localhost:5432/autofill_ai
```

### Option B: Neon Database (Serverless - Recommended)
1. Go to https://neon.tech/ and create a free account
2. Create a new project
3. Copy your connection string
4. Set DATABASE_URL environment variable

## Step 3: Environment Variables
Create a `.env` file in your project root:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

# Server Configuration
NODE_ENV=production
PORT=5000
```

## Step 4: Firebase Setup
1. Go to https://console.firebase.google.com/
2. In your Firebase project, add your domain to authorized domains:
   - Go to Authentication > Settings > Authorized domains
   - Add your website domain (e.g., yourdomain.com)

## Step 5: Build and Deploy

### For Production Build:
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the production server
npm start
```

### For Development:
```bash
npm run dev
```

## Step 6: Web Server Configuration

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Step 7: Database Migration
Run this command to set up your database tables:
```bash
npm run db:push
```

## Step 8: Process Management (Production)
Use PM2 to keep your application running:

```bash
# Install PM2 globally
npm install -g pm2

# Start your application
pm2 start npm --name "autofill-ai" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

## Quick Deploy Options

### 1. Vercel (Recommended for beginners)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### 2. Railway
1. Connect your GitHub repo to Railway
2. Add environment variables
3. Deploy with one click

### 3. Render
1. Connect your GitHub repo to Render
2. Choose "Web Service"
3. Add environment variables
4. Deploy

## Troubleshooting

### Common Issues:
1. **Database Connection**: Make sure your DATABASE_URL is correct
2. **Firebase Auth**: Ensure your domain is in Firebase authorized domains
3. **Build Errors**: Check if all dependencies are installed
4. **Port Issues**: Make sure your hosting provider supports the port you're using

### File Permissions:
Make sure your server has proper file permissions:
```bash
chmod -R 755 /path/to/your/project
```

## Security Considerations
1. Never commit your `.env` file to version control
2. Use HTTPS in production
3. Keep your Firebase keys secure
4. Regularly update dependencies
5. Use strong database passwords

## Support
If you encounter issues, check:
1. Server logs for error messages
2. Browser console for client-side errors
3. Database connection status
4. Firebase authentication configuration

Your Autofill.Ai application is now ready for self-hosting!