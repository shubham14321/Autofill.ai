#!/bin/bash

# Autofill.Ai Deployment Script
# This script helps deploy your application to production

echo "🚀 Starting Autofill.Ai deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create one using .env.example as template."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Application built successfully"

# Set up database
echo "🗄️  Setting up database..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Database setup failed"
    exit 1
fi

echo "✅ Database setup completed"

# Start the application
echo "🎉 Deployment completed successfully!"
echo "🌐 Starting the application..."
echo "📝 Your application will be available at http://localhost:5000"
echo "🔧 To start in production mode, run: npm start"
echo "🔧 To start in development mode, run: npm run dev"

# Optional: Start the application
read -p "Do you want to start the application now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting application..."
    npm start
fi