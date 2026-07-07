# Islah Web Service - Full Stack Next.js Application

## Overview

A professional B2B services agency website built with Next.js 14, featuring verified contact lists, lead generation analysis, and business process automation services.

## Features

### Frontend (Next.js 14)
- **App Router** with TypeScript
- **Tailwind CSS** for styling (no custom CSS)
- **Framer Motion** for professional animations and motion design
- **Lucide React** icons
- **Zod** form validation with **React Hook Form**
- **ShadCN UI** components for admin interface
- **Server Actions** for blog/portfolio management

### Admin Panel
- **Portfolio CRUD** operations
- **Blog CRUD** with rich text editor support
- **AI Blog Generator** powered by Groq
- **Site Settings** for header, footer, navigation
- **Dashboard** with real-time statistics

### Backend
- **PostgreSQL Database** with **Drizzle ORM**
- **Groq AI Integration** for blog generation
- **API Routes** for AI content generation
- **Resend API** for email notifications
- **Database migrations** with Drizzle Kit

### Auth & Security
- **SQLite database** storing all content
- **Session-based authentication**
- **Role-based access control**

## Site Structure

### Public Facing Pages
- **Home** - Hero section with service overview, stats, CTA
- **Services** - Detailed service cards with features
- **Portfolio** - Client success stories grid
- **About** - Company story and values
- **Blog** - Blog listing and search
- **Blog Slug** - Individual blog posts
- **Contact** - Contact form with validation
- **Not Found** - 404 error page

### Admin Pages
- **Dashboard** - Overview and statistics
- **Portfolio** - CRUD management
- **Blog** - CRUD management
- **Settings** - Site configuration
- **Blog Generator** - AI-powered content creation

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form + Zod
- ShadCN UI
- Next.js Server Actions

### Backend
- PostgreSQL with Drizzle ORM
- Drizzle Kit

### AI & Content
- Groq API (llama-3.3-70b-versatile)
- Custom AI blog generator API routes
- Keyword generation APIs

## Installation

```bash
# Clone the repository
npm create next-app@latest islahwebservice-nextjs-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# Navigate to project directory
cd islahwebservice-nextjs-app

# Install dependencies
npm install

# Setup database
npm run db:push

# Start development server
npm run dev
```

## Database Setup

The application uses PostgreSQL with Drizzle ORM:

```bash
npm run db:push
```

This will create the database schema including:
- `site_settings` - For website configuration
- `portfolio_items` - For project showcases
- `blog_posts` - For blog content
- `blog_keywords` - For AI-generated keywords
- `ai_settings` - For Groq AI configuration

### Email Configuration (Resend)

To enable contact form email notifications using Resend API:

Create or update `.env.local`:
```
GROQ_API_KEY="your-groq-api-key"
GROQ_MODEL="llama-3.3-70b-versatile"
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="your@email.com"
RESEND_TO_EMAIL="recipient@domain.com"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

Install the Resend package:
```bash
npm install resend
```

## Key Features

### Professional Design
- Dark navy + cyan/teal color palette
- Responsive design with Tailwind
- Smooth animations with Framer Motion
- Glass morphism effects
- Gradient backgrounds

### Motion Design
- Scroll-triggered animations
- Staggered card reveals
- Floating elements
- Smooth transitions

### Admin Functionality
- Add/edit/delete portfolio items
- Create/update blog posts
- Generate blog content with AI
- Manage site settings
- Dashboard analytics

### Blog System
- Search and tag filtering
- Read time estimation
- SEO-optimized content
- Responsive typography
- Social sharing

## Development Scripts

- `npm run dev` - Development server
- `npm run build` - Build for production
- `npm run start` - Production server
- `npm run lint` - Linting
- `npm run db:push` - Database migrations
- `npm run db:studio` - Database browser

## Project Structure

```
.
├── app/
│   ├── (site)/          # Public pages
│   │   ├── page.tsx     # Home
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── about/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   └──
│   └── (admin)/         # Admin panel
│       ├── page.tsx     # Dashboard
│       ├── portfolio/page.tsx
│       ├── blog/page.tsx
│       ├── settings/page.tsx
│       └── blog-generator/page.tsx
├── components/         # UI components
│   ├── ui/            # Component library
│   ├── site/         # Site components (header, footer)
│   ├── admin/        # Admin components
│   └── motion/       # Animation components
├── lib/               # Server-side code
│   ├── db/           # Database and schema
│   ├── actions/      # Server actions
│   ├── groq.ts       # AI integration
│   └── utils.ts      # Utility functions
├── public/            # Static assets
└── README.md          # Project documentation
```

## Best Practices

### Performance
- Server-side rendering for better SEO
- Optimized images with Next.js Image component
- Lazy loading for non-critical resources
- Efficient bundle sizes with dynamic imports

### Accessibility
- Semantic HTML5 markup
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### Security
- Environment variable management
- Input validation with Zod
- Rate limiting considerations
- CORS configuration

### UX/UI
- Consistent design system
- Clear information architecture
- Intuitive navigation
- Mobile-first approach

## Future Enhancements

Potential future improvements:
- Add blog categories and tags management
- Implement newsletter subscription
- Add language switching
- Integrate analytics tools
- Add PDF export for blog posts
- Create admin theme customization
- Add automated content scheduling

## Testing

To ensure code quality:

```bash
# Run linting
npm run lint

# Check TypeScript
npm run type-check

# Database setup
npm run db:push
```

## License

This project is part of the Islah Web Service portfolio. All rights reserved.

