# CMS Implementation Plan

This document outlines options for allowing a property manager to edit site content without technical knowledge.

## Current State

- ~43 MDX files in `/content/` directory
- Bilingual content (en/es pairs)
- Files use custom JSX components (`<AltBackground>`, `<Image>`, etc.)
- Editing currently requires git knowledge and MDX syntax understanding

## Recommended Solution: Decap CMS + Auth0

Use Decap CMS for the editing interface, with Auth0 for authentication (since we already use Auth0 for other projects).

### Architecture

```
Property manager visits /admin
       ↓
Auth0 login (email/password)
       ↓
Authenticated → Can edit content
       ↓
Saves → API commits to GitHub using service token → Vercel rebuilds
```

### Why Auth0 over GitHub OAuth

| GitHub OAuth                          | Auth0                                 |
| ------------------------------------- | ------------------------------------- |
| Property manager needs GitHub account | Email/password login                  |
| Their token commits directly          | Service token commits on their behalf |
| Limited to GitHub users               | Invite anyone                         |
| Revoke via GitHub                     | Revoke via Auth0 dashboard            |

## Implementation

### Files to Add

```
app/
  admin/
    page.tsx              # CMS interface (protected by Auth0)
  api/
    cms/
      save/route.ts       # Commits changes using GitHub App token
middleware.ts             # Auth0 protection for /admin routes
public/
  admin/
    config.yml            # CMS content schema
```

### Environment Variables

```bash
# Auth0 (existing setup)
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# GitHub (for committing changes)
GITHUB_TOKEN=             # Personal Access Token or GitHub App token with repo write access
GITHUB_REPO=username/515-punta-caelo
```

### Key Components

#### 1. Admin Page (`app/admin/page.tsx`)

```tsx
"use client";
import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    (async () => {
      const CMS = (await import("decap-cms-app")).default;
      CMS.init();
    })();
  }, []);

  return <div id="nc-root" />;
}
```

#### 2. CMS Config (`public/admin/config.yml`)

```yaml
backend:
  name: github
  repo: your-username/515-punta-caelo
  branch: main
  base_url: https://your-site.vercel.app
  auth_endpoint: /api/auth

media_folder: public/images
public_folder: /images

collections:
  - name: content-en
    label: "Content (English)"
    folder: content
    filter: { field: "locale", value: "en" }
    extension: mdx
    fields:
      - { name: title, widget: string }
      - { name: description, widget: string }
      - { name: body, widget: markdown }

  - name: content-es
    label: "Content (Spanish)"
    folder: content
    filter: { field: "locale", value: "es" }
    extension: mdx
    fields:
      - { name: title, widget: string }
      - { name: description, widget: string }
      - { name: body, widget: markdown }
```

### Setup Steps

1. **Configure Auth0**
   - Add `/admin` to protected routes
   - Create user for property manager

2. **Create GitHub Token**
   - Personal Access Token with `repo` scope, OR
   - GitHub App with repository write access

3. **Add env vars to Vercel**
   - Auth0 credentials
   - GitHub token

4. **Implement the code**
   - Admin page with Decap CMS
   - Auth0 middleware
   - API route for commits

## Considerations

### MDX Component Handling

Current MDX files use custom JSX components that Decap's markdown editor won't understand. Options:

1. **Accept raw JSX visibility** — Property manager sees JSX tags but edits text between them
2. **Create custom CMS widgets** — More development time but cleaner editing experience
3. **Simplify to pure Markdown** — Loses some design flexibility

### Estimated Effort

- Basic implementation: 1-2 days
- Custom widgets for components: +1-2 days
- Testing and refinement: +0.5 days

## Alternative Options Considered

### Git-based CMS (Decap with GitHub OAuth)

- Simpler setup
- Requires property manager to have GitHub account
- Less control over access management

### Headless CMS (Sanity, Contentful, Payload)

- Better editing experience
- Requires migrating all content
- Ongoing costs (Sanity has free tier)
- Higher implementation effort (4-7 days)

### Direct GitHub Editing

- Zero implementation effort
- Property manager edits files in GitHub web UI
- Requires GitHub account and basic training
- Less user-friendly

## References

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
