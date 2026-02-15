# Tina CMS Setup Guide

This project uses [Tina CMS](https://tina.io) to provide a visual content editing interface for non-technical users (e.g., your property manager).

## How It Works

- Content lives in MDX files in `/content/` with YAML frontmatter
- Tina provides an admin UI at `/admin` for editing these files
- Changes are committed to the Git repository, triggering a Vercel rebuild
- The site continues to work normally without Tina Cloud configured

## Local Development

Run the dev server with Tina's local content API:

```bash
npm run dev
```

This starts both Tina's local GraphQL server and Next.js. Visit `http://localhost:3000/admin` to access the CMS locally.

To run Next.js without Tina (faster startup):

```bash
npm run dev:next
```

## Setting Up Tina Cloud (Production)

To enable the CMS in production so your property manager can edit content:

### 1. Create a Tina Cloud Account

1. Go to [app.tina.io](https://app.tina.io) and sign up
2. Create a new project and connect it to your GitHub repository (`bwarner/515-punta-caelo`)
3. Note your **Client ID** and generate a **Read-Only Token**

### 2. Add Environment Variables to Vercel

In your Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_TINA_CLIENT_ID=<your-client-id>
TINA_TOKEN=<your-read-only-token>
```

### 3. Deploy

Push to your main branch or trigger a new deployment. The build script will automatically run `tinacms build` when credentials are present.

### 4. Invite Your Property Manager

In Tina Cloud dashboard:

1. Go to your project settings
2. Navigate to **Users** or **Collaborators**
3. Invite your property manager by email
4. They'll receive an email invitation to set up their account

### 5. Property Manager Workflow

Your property manager will:

1. Go to `https://yoursite.com/admin`
2. Log in with their Tina Cloud account
3. Select a page to edit (English or Spanish)
4. Edit content using the visual editor
5. Click **Save** — changes are committed to Git and auto-deployed

## Content Structure

Content is organized in two collections:

- **Pages (English)** — files matching `content/*-en.mdx`
- **Pages (Spanish)** — files matching `content/*-es.mdx`

Each page has:

- `title` — Page title (used in browser tab)
- `description` — Page description (used for SEO)
- `locale` — Language code (`en` or `es`)
- `darkBackground` — Whether to use dark background styling
- `body` — The page content (rich text / MDX)

## Pages Your Property Manager Can Edit

| Page            | English                  | Spanish                  |
| --------------- | ------------------------ | ------------------------ |
| Welcome         | `welcome-en.mdx`         | `welcome-es.mdx`         |
| House Rules     | `rules-en.mdx`           | `rules-es.mdx`           |
| Places to Eat   | `places-to-eat-en.mdx`   | `places-to-eat-es.mdx`   |
| Places to Drink | `places-to-drink-en.mdx` | `places-to-drink-es.mdx` |
| Things to Do    | `things-to-do-en.mdx`    | `things-to-do-es.mdx`    |
| Check-in/out    | `check-in-out-en.mdx`    | `check-in-out-es.mdx`    |
| Before You Go   | `before-you-go-en.mdx`   | `before-you-go-es.mdx`   |
| Amenities       | `amenities-en.mdx`       | `amenities-es.mdx`       |
| FAQ             | `faq-en.mdx`             | `faq-es.mdx`             |
| Contact         | `contact-en.mdx`         | `contact-es.mdx`         |
| And more...     |                          |                          |

## Notes

- **Wi-Fi page**: Contains environment variables for credentials — should only be edited by developers
- **Gallery images**: Managed in `content/gallery-images.mjs` — not editable through Tina
- The site builds and works normally without Tina Cloud credentials
- Tina runs in local mode during development (no cloud connection needed)
