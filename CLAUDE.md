# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js vacation rental website for a Panama property (515 Punta Caelo). The site is built with MDX for content management, supports internationalization (English/Spanish), and uses Tailwind CSS for styling.

## Development Commands

```bash
# Start development server
npm run dev
# or
yarn dev

# Build production version
npm run build

# Start production server
npm run start

# Lint code (ESLint with Prettier)
npx eslint .
```

## Architecture

**Framework**: Next.js 15 with App Router and TypeScript
**Content**: MDX files in `/content/` directory with frontmatter parsing enabled
**Styling**: Tailwind CSS 4.x with custom components in `/components/ui/`
**Internationalization**: Two locales (en, es) configured in `i18n.ts`
**Images**: Extensive image gallery stored in `/public/images/515-punta-caelo/`

### Key Directories

- `/app/` - Next.js App Router with locale-based routing `[locale]/[slug]/`
- `/content/` - MDX content files (property info, guides, FAQs) with locale suffixes
- `/components/` - React components including reusable UI components and property-specific layouts
- `/public/images/515-punta-caelo/` - Property photos organized by room/area type

### Content Management

Content is managed through MDX files in the `/content/` directory. Files follow the pattern `{name}-{locale}.mdx` (e.g., `introduction-en.mdx`, `faqs-es.mdx`). The gallery images are defined in `content/gallery-images.mjs` as a centralized image registry.

### Routing Structure

The app uses locale-based routing:
- `/{locale}/` - Home page
- `/{locale}/{slug}` - Content pages mapped to MDX files

### Styling System

Uses Tailwind CSS with:
- Custom font configuration (`app/font.ts`) including Dancing Script, Roboto, and Raleway
- Component library with Radix UI primitives
- Custom utility classes and animations via `tw-animate-css`

### Image Handling

The project contains extensive property photography with both original and optimized formats (AVIF, WebP). Images are organized by property areas (kitchen, bedrooms, pools, amenities).

### Base Design
The file is a pdf in ./design.pdf
