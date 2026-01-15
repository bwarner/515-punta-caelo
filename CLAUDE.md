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

**MDX Gotcha - Nested Paragraph Elements**: When writing MDX content, avoid using `<p>` tags directly. MDX automatically wraps text content in `<p>` tags, which can cause React hydration errors if you also use explicit `<p>` tags (resulting in nested `<p>` inside `<p>`). Instead, use `<span className="block">` for paragraph-like content inside JSX elements, or let MDX handle paragraphs naturally with blank lines between text.

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

### Design Reference

Design mockups exported from Canva are in `/design/`:

# Design Pages Reference

This document provides a reference for all design pages in the project, with descriptions of what each page shows.
This template is design for print but I am adopting it for a mobile responsive site, I will need change some imagery and icons

## Cover & Welcome Pages

- **design-page-0.png** - Homepage hero section with arched window view and "Welcome" text
- **design-page-1.png** - Alternate homepage hero with same arched window design
- **design-page-2.png** - Homepage hero with living room interior and plant
- **design-page-3.png** - Welcome page with living room fireplace and built-in shelving
- **design-page-4.png** - Host welcome page with dining table and personal message from Olivia
- **design-page-5.png** - Host welcome page with circular design and host photo
- **design-page-6.png** - Host welcome page with contact information layout
- **design-page-7.png** - Host welcome page with large hero photo and call-to-action

## Navigation & Menu

- **design-page-8.png** - Main navigation grid with 15 category icons (Check-in/out, WiFi, Amenities, etc.)
- **design-page-9.png** - Navigation grid with transport icon highlighted/selected

## Check-in/Check-out

- **design-page-10.png** - Check-in/check-out page with 3PM check-in and 11AM checkout times
- **design-page-11.png** - Check-in instructions with access code (5678) display
- **design-page-12.png** - WiFi information page with network credentials form
- **design-page-13.png** - WiFi page with simplified network/password layout

## Amenities & House Info

- **design-page-14.png** - Amenities list with "What We Provide" section
- **design-page-15.png** - About the house section with amenities continuation

## Activities & Attractions

- **design-page-20.png** - Things to do page featuring Universal Studios, Santa Monica Mountains, Natural History Museum, and LA Aquarium

## Dining

- **design-page-25.png** - Restaurants page showing sushi, burger, Italian, and brunch options with contact info

## Policies & Rules

- **design-page-30.png** - House rules page with 12 friendly reminders and policies

## Checkout & Departure

- **design-page-35.png** - Before you go/checkout page with checklist items and checkboxes
- **design-page-40.png** - Rebook with us page encouraging future stays
- **design-page-42.png** - Thank you page with final contact information

## A brochure for the complex can be found at: /design/brochure.pdf

## Design Notes

- Consistent beige/taupe color scheme throughout
- Clean, modern layout with plenty of white space
- Mix of photography and iconography
- Mobile-responsive design approach
- Professional hospitality branding

### Common Tasks

- Adding new MDX content pages (both locales)
- Updating gallery images and `gallery-images.mjs` registry
- Modifying property-specific copy
- Adjusting Tailwind styling to match Panama/beach aesthetic

## Here some real estate websites featuring units in Punta caelo, these page profile some background

- https://www.panamaequity.com/listings/oceanview-condo-for-sale-in-punta-caelo/ - realtor page for various units
- https://www.tropicalrealtypanama.com/en/portfolio-view/punta-caelo/ - realtor page for various units
- https://www.instagram.com/puntacaelo/ - instagram link

## Pictures of my unit and the grounds can be found in

/public/images/515-punta-caelo

## Listing data

JSON data containing the list is in listing.json

### rules

remember en is the primary language remember to use hreflang or canonical tags for content in alternate languages

Remember to update the Github actions if need for add things like tests, formatters, etc

Format the code before committing it

Make change in a feature branch
