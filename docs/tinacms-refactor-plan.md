# TinaCMS Content Refactor Plan

## Current State Analysis

### Page Types

**Simple Markdown Pages (Already mostly compatible):**

- `rules-*.mdx` - Standard markdown with lists
- `emergency-*.mdx` - Standard markdown
- `faq-*.mdx` - Standard markdown with FAQ structure
- `places-to-eat-*.mdx` - Standard markdown with restaurant listings
- `places-to-drink-*.mdx` - Standard markdown

**Complex Layout Pages (Need wrapper components):**

- `amenities-*.mdx` - Hero + cards with images and lists
- `check-in-out-*.mdx` - Hero + time displays + info blocks
- `location-*.mdx` - Hero + map + directions
- `wifi-*.mdx` - Custom WiFi panel
- `home-*.mdx` - Landing page
- `gallery-*.mdx` - Image gallery
- `property-*.mdx` - Property details
- `contact-*.mdx` - Contact form/info

### Current Components Used

1. `<Menubar>` - Already in Tina templates ✓
2. `<Image>` - Already in Tina templates ✓
3. `<AltBackground>` - NOT in templates
4. `<WiFiPanel>` - NOT in templates
5. `<TrackedAirbnbButton>` - Already in Tina templates ✓
6. Raw `<div className="...">` - NOT supported

## New Components to Create

### 1. PageHero

Hero image with title banner.

```tsx
<PageHero
  image="/images/doorway.jpg"
  imageAlt="Entrance"
  title="Check-in/out"
/>
```

### 2. ContentCard

White card with optional image, title, and rich-text content.

```tsx
<ContentCard image="/images/kitchen.jpg" imageAlt="Kitchen" title="Kitchen">
  - Gas range cooker - Electric oven - Fridge
</ContentCard>
```

### 3. TimeDisplay

Large time display for check-in/out.

```tsx
<TimeDisplay time="3 PM" label="Check-in" />
```

### 4. InfoSection

Title + paragraph blocks.

```tsx
<InfoSection title="Gate Procedure">
  At the main entrance, please notify security...
</InfoSection>
```

### 5. CalloutBox

Styled callout/notice box.

```tsx
<CalloutBox variant="info">
  Thank you for helping us keep a safe space!
</CalloutBox>
```

### 6. MapEmbed

Google Maps embed.

```tsx
<MapEmbed lat={8.4487} lng={-79.9475} title="Punta Caelo" />
```

### 7. PlaceListing

Restaurant/place listing with structured data.

```tsx
<PlaceListing
  name="Caelo Beach Restaurant"
  location="Punta Caelo"
  cuisine="Fine Dining"
  price="$$$"
  featured={true}
>
  Description of the restaurant...
</PlaceListing>
```

## Testing Strategy

### Storybook

- Visual testing of each component in isolation
- All variants documented
- Property manager can preview components

### Vitest Snapshot Tests

- Render each component with props
- Snapshot the output
- Catch unintended changes during refactor

### Integration Tests

- Full page renders match original output
- Visual regression testing (optional)

## Migration Steps

1. ✅ Create feature branch
2. Set up Storybook
3. Set up Vitest with React Testing Library
4. Create wrapper components with tests
5. Register components in Tina config
6. Migrate simple pages first (rules, emergency, faq)
7. Migrate complex pages (amenities, check-in, location)
8. Visual verification
9. Create PR

## Files to Modify

- `components/tina/*.tsx` - New wrapper components
- `tina/config.ts` - Register templates
- `content/*.mdx` - All content files
- `package.json` - Add Storybook, Vitest
- `.storybook/*` - Storybook config
