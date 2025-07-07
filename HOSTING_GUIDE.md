# Autofill.Ai - Complete Hosting Guide

## 🚀 One-Click Deployment Options (Recommended)

### 1. Vercel (Easiest for beginners)
```bash
# Push your code to GitHub first
git init
git add .
git commit -m "Initial commit"
git push origin main

# Then:
# 1. Go to vercel.com
# 2. Import your GitHub repository
# 3. Add environment variables (see below)
# 4. Deploy automatically
```

### 2. Railway (Full-stack friendly)
```bash
# 1. Go to railway.app
# 2. Connect your GitHub repository
# 3. Add PostgreSQL database addon
# 4. Add environment variables
# 5. Deploy with one click
```

### 3. Render (Free tier available)
```bash
# 1. Go to render.com
# 2. Create new Web Service
# 3. Connect GitHub repository
# 4. Add PostgreSQL database
# 5. Configure environment variables
```

## 🔧 Manual Server Setup

### Prerequisites
- Server with Node.js 18+ installed
- PostgreSQL database
- Domain name (optional but recommended)

### Step 1: Upload Your Files
```bash
# Upload all project files to your server
# Make sure to include:
# - All source code
# - package.json
# - .env file (with your settings)
```

### Step 2: Install Dependencies
```bash
ssh your-server
cd /path/to/your/project
npm install
```

### Step 3: Configure Environment
```bash
# Create .env file
cp .env.example .env

# Edit with your settings
nano .env
```

### Step 4: Set up Database
```bash
# Run database migrations
npm run db:push
```

### Step 5: Build and Start
```bash
# Build the application
npm run build

# Start in production mode
npm start
```

## 📊 Database Options

### Option A: Neon Database (Recommended)
```bash
# 1. Create account at neon.tech
# 2. Create new project
# 3. Copy connection string
# 4. Add to .env file:
DATABASE_URL=postgresql://username:password@server.neon.tech/database
```

### Option B: Your Own PostgreSQL
```bash
# Install PostgreSQL on your server
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb autofill_ai

# Create user
sudo -u postgres createuser --interactive

# Update .env with connection string
DATABASE_URL=postgresql://username:password@localhost:5432/autofill_ai
```

## 🔐 Environment Variables Setup

### Required Variables:
```env
DATABASE_URL=your_database_connection_string
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
NODE_ENV=production
```

### Firebase Setup Steps:
1. Go to https://console.firebase.google.com/
2. Create new project
3. Enable Authentication (Google + Email/Password)
4. Add your domain to authorized domains
5. Get your config values from project settings

## 🌐 Web Server Configuration

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]

# Proxy to Node.js app
ProxyPass /api/ http://localhost:5000/api/
ProxyPassReverse /api/ http://localhost:5000/api/
```

### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔄 Process Management

### Using PM2 (Recommended)
```bash
# Install PM2
npm install -g pm2

# Start your app
pm2 start npm --name "autofill-ai" -- start

# Save configuration
pm2 save

# Auto-start on boot
pm2 startup
```

### Using systemd
```bash
# Create service file
sudo nano /etc/systemd/system/autofill-ai.service

# Add configuration:
[Unit]
Description=Autofill.Ai Application
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/your/project
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target

# Enable and start
sudo systemctl enable autofill-ai
sudo systemctl start autofill-ai
```

## 🚦 Testing Your Deployment

### Health Check
```bash
# Test if server is running
curl http://localhost:5000/api/health

# Test database connection
npm run db:push
```

### Browser Testing
1. Open your domain in browser
2. Try user registration
3. Test form filling
4. Check PDF generation

## 🔍 Troubleshooting

### Common Issues:

#### Database Connection Error
```bash
# Check database URL
echo $DATABASE_URL

# Test connection
npm run db:push
```

#### Firebase Authentication Error
```bash
# Check Firebase config
echo $VITE_FIREBASE_API_KEY
echo $VITE_FIREBASE_PROJECT_ID

# Verify authorized domains in Firebase console
```

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Port Already in Use
```bash
# Check what's using port 5000
sudo lsof -i :5000

# Kill process if needed
sudo kill -9 <process_id>
```

## 🔐 Security Best Practices

1. **Use HTTPS in production**
2. **Keep .env files secure**
3. **Regular security updates**
4. **Strong database passwords**
5. **Firebase security rules**

## 📈 Performance Optimization

### Server Optimization
```bash
# Use production build
NODE_ENV=production npm start

# Enable gzip compression
# (configure in web server)
```

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
```

## 🎯 Quick Deploy Checklist

- [ ] Code uploaded to server
- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Database set up and migrated
- [ ] Application built (`npm run build`)
- [ ] Process manager configured (PM2)
- [ ] Web server configured (Nginx/Apache)
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Firebase authorized domains updated
- [ ] Application tested and working

## 📞 Support

If you encounter issues:
1. Check server logs: `pm2 logs autofill-ai`
2. Check database connection
3. Verify environment variables
4. Test Firebase authentication
5. Review browser console for errors

Your Autofill.Ai application is now ready to serve users worldwide! 🌍