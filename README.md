# 515 Punta Caelo - Vacation Rental Digital Guidebook

[![CI](https://github.com/bwarner/515-punta-caelo/actions/workflows/ci.yml/badge.svg)](https://github.com/bwarner/515-punta-caelo/actions/workflows/ci.yml)

A modern, mobile-first digital guidebook for a Panama vacation rental property. Built with Next.js 15, TypeScript, and MDX for content management.

**Live Site:** [515puntacaelo.vercel.app](https://515puntacaelo.vercel.app)

## Tech Stack

| Category          | Technology                                         |
| ----------------- | -------------------------------------------------- |
| **Framework**     | Next.js 15 (App Router)                            |
| **Language**      | TypeScript                                         |
| **Content**       | MDX with frontmatter parsing                       |
| **Styling**       | Tailwind CSS 4.x                                   |
| **UI Components** | Radix UI primitives, shadcn/ui                     |
| **Analytics**     | PostHog (with reverse proxy for ad-blocker bypass) |
| **Deployment**    | Vercel                                             |
| **CI/CD**         | GitHub Actions                                     |

## Features

- **Internationalization** - Full English/Spanish support with locale-based routing
- **MDX Content Management** - Property info, guides, FAQs managed as MDX files
- **Mobile-First Design** - Responsive layout optimized for guests on mobile devices
- **Analytics Integration** - PostHog event tracking with custom events for user behavior analysis
- **Security Hardened** - Path traversal protection, security headers, input validation
- **Developer Experience** - ESLint, Prettier, Husky pre-commit hooks, TypeScript strict mode

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/[slug]/    # Dynamic locale-based routing
│   └── layout.tsx          # Root layout with fonts & analytics
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   └── *.tsx               # Property-specific components
├── content/                # MDX content files
│   ├── *-en.mdx            # English content
│   └── *-es.mdx            # Spanish content
├── public/images/          # Property photography
└── .github/workflows/      # CI/CD pipelines
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npx eslint .
```

## CI/CD Pipeline

The GitHub Actions workflow runs on every PR:

1. **Lint** - ESLint with zero warnings tolerance
2. **Type Check** - TypeScript compiler validation
3. **Build** - Vercel CLI build to match production environment

## Code Quality

- **Pre-commit hooks** via Husky + lint-staged
- **ESLint** with TypeScript, Prettier, and import plugins
- **Prettier** for consistent code formatting
- **TypeScript** strict mode enabled

## Architecture Decisions

- **MDX over CMS** - Content changes are version-controlled and deployable via git
- **App Router** - Leverages React Server Components for optimal performance
- **Reverse Proxy Analytics** - PostHog requests proxied through `/ingest/*` to bypass ad blockers
- **Locale-based routing** - Clean URLs like `/en/wifi` and `/es/wifi` for SEO

## Author

**Byron Warner**

- GitHub: [@bwarner](https://github.com/bwarner)
