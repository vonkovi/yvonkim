# Personal Blog Website

## Overview

This is a personal blog website built with a modern full-stack architecture featuring React frontend, Express backend, and PostgreSQL database. The application serves as a platform for publishing and reading blog posts with a clean, minimalist design philosophy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Typography**: Custom font stack using Spectral (serif) and DM Sans (sans-serif)

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Content Processing**: Markdown parsing with gray-matter for frontmatter and marked for HTML conversion

### Design Philosophy
The application follows a minimalist design approach with:
- Clean, typography-focused layout
- Monochromatic color scheme (black text on white background)
- Serif fonts for headings (Spectral) and sans-serif for body text (DM Sans)
- Minimal UI components focusing on readability and content

## Key Components

### Blog System
- **Content Source**: Markdown files stored in `/blog` directory
- **Frontmatter Support**: YAML frontmatter for metadata (title, description, date, tags, slug)
- **Dynamic Loading**: File system synchronization with database storage
- **Tag-based Filtering**: Categorization system for blog posts

### Data Layer
- **Storage Interface**: Abstract storage interface (`IStorage`) with in-memory implementation
- **Database Schema**: Drizzle schema definitions for blog posts and users
- **Migration System**: Drizzle Kit for database migrations

### UI Components
- **Component Library**: Comprehensive set of shadcn/ui components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton components for better UX
- **Error Handling**: User-friendly error messages and fallbacks

## Data Flow

1. **Content Creation**: Blog posts are created as Markdown files in the `/blog` directory
2. **File System Sync**: Backend synchronizes file system with database on API requests
3. **API Layer**: Express routes serve blog post data and metadata
4. **Frontend Queries**: React Query fetches and caches blog data
5. **Rendering**: Components render blog posts with proper typography and styling

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS
- **Content Processing**: gray-matter, marked
- **State Management**: TanStack Query

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **Database Tooling**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `/dist/public`
- **Backend**: ESBuild bundles server code for production deployment
- **Database**: Drizzle migrations handle schema changes

### Environment Configuration
- **Database**: Configured via `DATABASE_URL` environment variable
- **Development**: Hot module replacement with Vite dev server
- **Production**: Static file serving with Express in production mode

### File Structure
```
├── client/           # React frontend
├── server/           # Express backend
├── shared/           # Shared TypeScript types and schemas
├── blog/             # Markdown blog posts
├── migrations/       # Database migrations
└── dist/             # Production build output
```

The application is designed for easy deployment on platforms like Replit, with development tooling optimized for the Replit environment including runtime error overlays and cartographer integration.