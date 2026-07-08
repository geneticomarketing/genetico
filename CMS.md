# Payload CMS + Supabase Setup

This project uses [Payload CMS 3](https://payloadcms.com) with Supabase PostgreSQL for content management. All website content can be edited from the admin dashboard at `/admin`.

## Quick Start

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy the **Connection string** from **Project Settings → Database → Connect**
   - Use the **Transaction pooler** URI for serverless/Next.js (port 6543)
   - Or **Direct connection** for local development (port 5432)

### 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```env
PAYLOAD_SECRET=your-random-secret-at-least-32-characters-long
DATABASE_URI=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Start the dev server

```bash
npm run dev
```

On first run, Payload will auto-create database tables (via `db push` in development).

### 4. Create admin user

Visit [http://localhost:3000/admin](http://localhost:3000/admin) and create your first admin account.

### 5. Seed existing content

Populate the CMS with all current hardcoded website content:

```bash
npm run seed
```

## Admin Dashboard

Access the CMS at **`/admin`**. Content is organized **by page** in the sidebar:

| Group | What you can edit |
|-------|-------------------|
| **Site-wide** | Site settings, navigation, footer |
| **Home** | Home page sections (hero, who we are, CTAs) + ecosystem modules, gaps, partners, news |
| **About** | About page content + team members + grants & awards |
| **Platform** | Platform page (all sections + CTA) |
| **Solutions** | Hospital and Life Science solution pages |
| **Public Health** | Public health page (hero, tiers, architecture, CTA) |
| **Resources** | Resources page + blog posts, videos, external articles |
| **Legal & Utility** | Privacy policy, coming soon page |
| **Media** | Uploaded images and files |

Each page has a **Page Content** global for section titles, descriptions, and CTAs. Repeatable items (team, partners, blogs, etc.) live in collections under the same group.

### Globals (single-page settings)
| Global | What it controls |
|--------|-----------------|
| **Site Settings** | Contact emails, Calendly, newsletter URL |
| **Navigation** | Main nav links, solutions dropdown, CTA button |
| **Footer** | Tagline, menu links, social links, copyright |
| **Home Page** | Hero slides, section headings, CTA |
| **About Page** | Hero, vision, leadership intro, grants intro |
| **Platform Page** | All platform section content |
| **Public Health Page** | Hero, tiers, architecture, impact |
| **Resources Page** | Hero, filter tabs, newsletter CTA |

### Collections (repeatable content)
| Collection | What it controls |
|-----------|-----------------|
| **Blog Posts** | All blog articles |
| **News Articles** | Home page news section |
| **Team Members** | Leadership team on About page |
| **Partners** | Partner logos marquee |
| **Grants & Awards** | Recognition timeline |
| **Ecosystem Modules** | Home "Where the System Breaks" section |
| **Ecosystem Gaps** | Home ecosystem gaps tabs |
| **Solution Pages** | Hospital & Life Science solution pages |
| **Featured Videos** | Resources featured video |
| **Short Videos** | Resources short video cards |
| **External Articles** | LinkedIn/editorial links |
| **Legal Pages** | Privacy policy and future legal pages |
| **Media** | Uploaded images and files |

## Optional: Supabase Storage for media

To store uploaded images in Supabase Storage instead of local disk:

1. Create a bucket in Supabase Storage (e.g. `genetico-media`)
2. Get S3 credentials from **Project Settings → Storage → S3 Connection**
3. Add to `.env.local`:

```env
S3_BUCKET=genetico-media
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=ap-south-1
S3_ENDPOINT=https://[project-ref].supabase.co/storage/v1/s3
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js + Payload admin |
| `npm run seed` | Import hardcoded content into CMS |
| `npm run generate:types` | Regenerate TypeScript types from schema |
| `npm run generate:importmap` | Regenerate Payload admin import map |

## How it works

- **Frontend** fetches content from Payload via `src/lib/cms/queries.ts`
- If the database is unavailable or empty, the site falls back to hardcoded defaults in `src/lib/`
- **Payload admin** at `/admin` provides the full content editing dashboard
- **API** at `/api/*` serves Payload REST endpoints (specific routes like `/api/contact` take precedence)
