# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your Punta Caelo vacation rental guest guide. The integration uses Next.js 15.3+ best practices with the `instrumentation-client.ts` file for client-side initialization, a reverse proxy configuration for improved tracking reliability, and event capture across key user interactions.

## Integration Summary

### Core Setup Files
- **`instrumentation-client.ts`** - Client-side PostHog initialization with error tracking enabled
- **`next.config.js`** - Added reverse proxy rewrites for `/ingest/*` to route through your domain
- **`.env.local`** - Added PostHog API key and host environment variables

### Event Tracking Implementation

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `guide_section_clicked` | User clicked on a guide section in the navigation grid (Check-in, WiFi, Amenities, etc.) | `components/guide-grid.tsx` |
| `menu_navigation_clicked` | User navigated to a page via the hamburger menu | `components/menu.tsx` |
| `language_changed` | User switched between English and Spanish language versions | `components/header.tsx` |
| `mobile_menu_toggled` | User opened or closed the mobile hamburger menu | `components/header.tsx` |
| `footer_link_clicked` | User clicked a link in the footer navigation | `components/footer.tsx` |
| `wifi_qr_code_viewed` | User interacted with the WiFi QR code (conversion: guest connecting to WiFi) | `components/wifi-qr-code.tsx` |
| `airbnb_booking_clicked` | User clicked the Book on Airbnb button (high-value conversion event) | `content/review-en.mdx` |
| `airbnb_share_clicked` | User clicked the Share Listing button to share with friends | `content/review-en.mdx` |
| `image_gallery_interacted` | User interacted with the property image gallery | `components/image-gallery.tsx` |

### New Components Created
- **`components/tracked-airbnb-button.tsx`** - Reusable button component with built-in PostHog event tracking for Airbnb conversions

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/279223/dashboard/978546) - Core analytics dashboard for tracking navigation, engagement, and conversion events

### Insights
- [Airbnb Conversion Actions](https://us.posthog.com/project/279223/insights/iH9PD4mo) - Tracks Airbnb booking clicks and share listing clicks
- [Guide Section Navigation](https://us.posthog.com/project/279223/insights/4BNIebMR) - Shows which guide sections guests click most frequently
- [Language Preferences](https://us.posthog.com/project/279223/insights/GvVPJBTL) - Tracks language changes between English and Spanish
- [WiFi QR Code Engagement](https://us.posthog.com/project/279223/insights/ZT9jkpxj) - Tracks guest interactions with WiFi setup
- [Navigation & Engagement Overview](https://us.posthog.com/project/279223/insights/ENd7eW6L) - Overview of all navigation events

## Configuration Notes

- PostHog is configured to use a reverse proxy (`/ingest/*`) for improved tracking reliability
- Error tracking is enabled via `capture_exceptions: true`
- Debug mode is automatically enabled in development
- Pageviews and pageleaves are automatically captured with `defaults: "2025-05-24"`
