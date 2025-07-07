# Autofill.Ai - Replit Configuration

## Overview

Autofill.Ai is a full-stack web application that enables users to create a comprehensive profile once and automatically fill multiple Indian government and institutional forms. The application generates downloadable PDFs with embedded signatures and photos, streamlining the form-filling process for users.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens
- **Authentication**: Firebase Auth with Google Sign-In and email/password

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with type-safe endpoints
- **Session Management**: PostgreSQL sessions with connect-pg-simple

### Build System
- **Development**: Vite dev server with HMR
- **Production**: Static files served by Express
- **Bundling**: esbuild for server-side bundling
- **TypeScript**: Strict mode with path mapping

## Key Components

### Authentication System
- Firebase Authentication integration
- Google OAuth and email/password authentication
- Auto-popup login after 3 seconds for unauthenticated users
- JWT-based session management
- User profile synchronization with database

### User Profile Management
- Comprehensive profile with personal, contact, and document information
- Profile completion progress tracking
- Photo and signature upload capabilities
- Real-time validation and completion percentage calculation

### Form Library & Management
- Predefined form templates for common Indian forms
- Category-based organization (Banking, Education, Government, Health, Job)
- Search functionality with intelligent suggestions
- Form metadata management and versioning

### PDF Generation Engine
- Client-side PDF generation using pdf-lib
- Automatic field mapping from user profile to form templates
- Customizable text color (black/blue) selection
- Signature and photo embedding in generated PDFs
- Form completion tracking and partial fill support

### Admin Dashboard
- Form template management
- User analytics and statistics
- Form usage tracking
- System administration tools

## Data Flow

1. **User Authentication**: Firebase Auth → User creation/lookup in PostgreSQL
2. **Profile Management**: User input → Profile validation → Database storage
3. **Form Selection**: Form library → Template retrieval → Field mapping analysis
4. **Form Filling**: Profile data → Template mapping → PDF generation → Download
5. **History Tracking**: Form submissions → Status tracking → Download history

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **pdf-lib**: Client-side PDF generation and manipulation
- **firebase**: Authentication and user management

### UI Framework
- **@radix-ui/react-***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **tsx**: TypeScript execution for development
- **vite**: Fast build tool and dev server
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- tsx for TypeScript server execution
- Database migrations with Drizzle Kit
- Environment variables for configuration

### Production Build
1. Frontend: Vite builds static assets to `dist/public`
2. Backend: esbuild bundles server code to `dist/index.js`
3. Database: Drizzle migrations applied via `db:push`
4. Static file serving through Express

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **Firebase Config**: API keys and project configuration
- **NODE_ENV**: Environment-specific behavior control

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup