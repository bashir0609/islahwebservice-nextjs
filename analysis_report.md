# Islah Web Service - Application Analysis

## Architecture and Tech Stack

The application is a full-stack web application built using **Next.js 14** (App Router).

**Frontend:**
- **Language:** TypeScript
- **Styling:** Tailwind CSS (utility-first CSS)
- **UI Components:** Shadcn UI (Radix UI primitives), Lucide React (icons)
- **Animations:** Framer Motion (used for scroll-triggered animations, card reveals, etc.)
- **Forms & Validation:** React Hook Form combined with Zod for schema validation.

**Backend & Data Layer:**
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication/Security:** Session-based auth and role-based access control. Mentions of SQLite in README, but config strongly points to Postgres.
- **Serverless/API:** Next.js Route Handlers (`app/api/...`) and Server Actions.

**Integrations:**
- **AI Integration:** Groq API (specifically using `llama-3.3-70b-versatile` model) for generating blog content and keywords.
- **Email:** Resend API for contact form notifications.

## Key Features

**Public-Facing Pages:**
- **Home (`/`):** Features a hero section, overview of services, stats, and a call to action. Heavily uses Framer Motion for revealing sections.
- **Services (`/services/*`):** Specialized pages for B2B solutions like Verified B2B Contact Lists, Lead Generation Analysis, and Business Process Automation.
- **Portfolio (`/portfolio`):** Showcases client success stories and projects.
- **Blog (`/blog` & `/blog/[slug]`):** List of blog posts with search/tag filtering and individual post pages.
- **Contact (`/contact`):** Contains a form for inquiries, integrated with the Resend API.
- **About (`/about`):** Company background.

**Admin Dashboard & Functionality:**
- Located under `/admin`, protected by authentication.
- **Dashboard:** Overview statistics.
- **CRUD Management:** Interfaces for managing Portfolio items and Blog posts.
- **Settings:** General site settings.
- **AI Blog Generator (`/admin/blog-generator`):** Uses Groq API to auto-generate blog content and suggest keywords based on inputs.

**Database Schema (Drizzle ORM):**
- `site_settings`: General site configurations.
- `portfolio_items`: Structured data for portfolio (title, image, tags, featured status).
- `blog_posts`: Content (title, slug, excerpt, content, published status, tags).
- `blog_keywords`: AI-generated keywords and categories.
- `ai_settings`: Configurations for AI providers (e.g., Groq API keys, models, temperature).

## Potential Issues and Requirements

**Database Configuration:**
- The application relies on PostgreSQL. A command like `npm run db:push` will fail locally unless a Postgres instance is actively running and the `DATABASE_URL` environment variable is correctly set in `.env.local` or exported in the environment. Currently, it defaults to a local Postgres string (`postgresql://postgres:password@localhost:5432/islahwebservice`) which failed to connect during tests (`ECONNREFUSED`).
- The database connection (`lib/db/index.ts`) is lazily initialized, which is good practice to prevent build failures, but requires valid credentials at runtime.

**Environment Variables Missing (`.env.local`):**
To run the full suite of features (especially in production), the following environment variables need to be configured:
- `DATABASE_URL`: Connection string for PostgreSQL.
- `GROQ_API_KEY`: Required for the AI blog generator features.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`: Required for the contact form functionality.
- `ADMIN_USERNAME` and `ADMIN_PASSWORD`: For accessing the `/admin` area.
