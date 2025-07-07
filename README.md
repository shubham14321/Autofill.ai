# Autofill.Ai - Smart Indian Government Forms Auto-Fill Application

## Overview
Autofill.Ai is a comprehensive web application that allows users to create a detailed profile once and automatically fill multiple Indian government forms. The application generates downloadable PDFs with embedded signatures and photos, supporting multi-language (English/Hindi) functionality.

## Features
- **User Authentication**: Firebase-based authentication with Google sign-in and email/password
- **Smart Profile Management**: Comprehensive user profiles with Indian-specific fields
- **Form Auto-Fill**: Automatically fills 10+ common Indian government forms
- **PDF Generation**: Creates downloadable PDFs with signatures and photos
- **Multi-Language Support**: English and Hindi language switching
- **Form History**: Track submitted forms with status indicators
- **Admin Dashboard**: Manage forms and view user statistics
- **Mobile Responsive**: Works perfectly on all devices

## Tech Stack
- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js + Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Firebase Auth
- **PDF Generation**: pdf-lib
- **UI Components**: Radix UI + shadcn/ui

## Quick Start (Development)

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Firebase project with authentication enabled

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
DATABASE_URL=your_postgresql_connection_string
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

5. Set up the database:
```bash
npm run db:push
```

6. Start the development server:
```bash
npm run dev
```

## Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deployment Options

#### 1. Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

#### 2. Traditional Web Hosting
1. Build the application: `npm run build`
2. Upload the `dist` folder to your server
3. Configure your web server (Apache/Nginx)
4. Set up environment variables
5. Start the application: `npm start`

#### 3. Cloud Platforms
- **Railway**: One-click deployment with database
- **Render**: Full-stack hosting with PostgreSQL
- **DigitalOcean**: App Platform deployment

## Database Setup

### Using Neon Database (Recommended)
1. Create account at https://neon.tech/
2. Create a new project
3. Copy the connection string
4. Set `DATABASE_URL` in your environment

### Using PostgreSQL
1. Create a PostgreSQL database
2. Set connection string in `DATABASE_URL`
3. Run migrations: `npm run db:push`

## Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication with Google and Email/Password
3. Add your domain to authorized domains
4. Get your Firebase config values:
   - API Key
   - App ID
   - Project ID

## Available Forms

The application includes templates for these Indian government forms:
- PAN Card Application
- Aadhaar Card Update
- Passport Application
- Bank Account Opening
- Voter ID Registration
- Driving License Application
- School Admission Form
- Income Tax Return
- GST Registration
- EPF Withdrawal

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom hooks
├── server/                # Node.js backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database operations
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema
└── dist/                  # Built files (production)
```

## API Endpoints

### Authentication
- `GET /api/user` - Get current user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Profile Management
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create/update profile

### Forms
- `GET /api/forms` - Get all forms
- `GET /api/forms/:id` - Get specific form
- `POST /api/forms/:id/submit` - Submit form

### Form History
- `GET /api/submissions` - Get user submissions
- `GET /api/submissions/:id` - Get specific submission

## Environment Variables

### Required Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/autofill_ai
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Optional Variables
```env
NODE_ENV=production
PORT=5000
```

## Security Considerations
- Never commit `.env` files to version control
- Use HTTPS in production
- Keep Firebase keys secure
- Regularly update dependencies
- Use strong database passwords

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License.

## Support
For deployment issues, check:
1. Server logs for error messages
2. Browser console for client-side errors
3. Database connection status
4. Firebase authentication configuration

## Version History
- v1.0.0 - Initial release with full functionality
- Multi-language support (English/Hindi)
- PDF generation with signatures
- Complete form management system