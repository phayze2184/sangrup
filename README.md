# San Electroterm Grup — Bilingual Marketing Site

A production website for [San Electroterm Grup](https://www.sangrup.ro), a Romanian railway and civil electrical installations contractor, built solo end-to-end with [Astro](https://astro.build/) — from design system and component architecture through i18n, performance tuning,
accessibility, and SEO.

This repo doubles as a portfolio piece: every section below documents a real engineering
decision made on a real client project.

## Real Lighthouse scores

Audited against the production build (mobile, throttled), homepage:

| Performance | Accessibility | Best Practices | SEO |
|:---:|:---:|:---:|:---:|
| 97 | 100 | 100 | 100 |

## Engineering highlights

**Performance**
- Every `<Image>`/`<Picture>` uses explicit `widths`/`sizes` tuned to the element's actual CSS-rendered size — no oversized assets shipped to undersized slots.
- Fonts (Inter, Space Grotesk, DM Mono) are self-hosted as `woff2`, split by
  `latin`/`latin-ext` unicode-range, and the above-the-fold subsets are preloaded —
  eliminating the render-blocking chain a third-party font CDN would introduce.
- LCP-critical images use `fetchpriority="high"` and are discoverable directly in the
  initial HTML (verified against Lighthouse's request-discovery and network-dependency-tree
  audits, not just the top-level score).
- Hashed, immutable long-term caching for all build output via `.htaccess`, with a
  deliberately shorter cache window for HTML/sitemap so content updates propagate.

**Accessibility**
- WCAG AA color contrast verified numerically (OKLCH → sRGB → relative luminance)/Component colors were adjusted where the computed ratio fell short.
- Strict sequential heading hierarchy across every page.
- Visible skip-link, accessible modal/popup patterns, `prefers-reduced-motion`,
  `prefers-contrast`, and `forced-colors` support throughout.

**Internationalization**
- Native `astro:i18n` routing: Romanian unprefixed at `/`, English under `/en/`, with
  a shared, locale-keyed content model (`Record<Locale, T>`) instead of duplicated pages.
- Correct `hreflang` alternates (including `x-default`) computed from a single
  locale-agnostic path, avoiding double-prefix bugs.

**SEO**
- JSON-LD `Organization` schema, per-locale Open Graph/Twitter Card images generated from real site imagery, canonical URLs, and an i18n-aware XML sitemap.

**Architecture**
- CSS design tokens, cascade layers (`reset, tokens, base, utilities, accessibility`),
  logical properties, and container queries.
- Locale-aware components read their own strings via a small `getLocale()` helper.
- Contact form posts to [Web3Forms](https://web3forms.com/) with client-side validation
  and an accessible success/error popup.

## Tech Stack

- [Astro 7](https://astro.build/) (static output) + TypeScript (strict)
- `astro:assets` image pipeline (`sharp`) for automatic AVIF/WebP + responsive `srcset`
- `astro:i18n` for routing, `@astrojs/sitemap` for the XML sitemap
- Scoped component CSS with design tokens — no CSS framework
- pnpm

## Project Structure

```text
.
├── public/
│   ├── assets/                 # Static, unhashed assets (PDFs, small icons)
│   ├── og/                     # Generated Open Graph images
│   ├── .htaccess               # Cache-control rules for Apache-based hosting
│   └── robots.txt
├── src/
│   ├── assets/                 # Images processed by the astro:assets pipeline
│   ├── fonts/                  # Self-hosted woff2 fonts
│   ├── i18n/                   # Locale list + UI string dictionary
│   ├── components/             # Reusable building blocks (Button, Section, FormField, …)
│   ├── sections/               # Page sections (Hero, Services, Contact, Header, Footer, …)
│   ├── layouts/                # BaseLayout (head/meta/schema, header, footer)
│   ├── pages/                  # Romanian routes + /en/ mirror
│   ├── data/site.ts            # Locale-keyed site content
│   └── styles/global.css       # Design tokens, reset, base styles, cascade layers
├── astro.config.mjs
└── package.json
```

## Pages

| Romanian (default) | English |
|---|---|
| `/` | `/en/` |
| `/about` | `/en/about` |
| `/certificari` | `/en/certificari` |
| `/politica-de-confidentialitate` | `/en/politica-de-confidentialitate` |

Plus a bilingual `404` page.

## Getting Started

Requires Node.js 18+ and [pnpm](https://pnpm.io/).

```bash
pnpm install     # install dependencies
pnpm run dev     # start the dev server
pnpm run build   # production build -> dist/
pnpm run preview # serve the production build locally
```

## Content Editing

Most editable content lives in `src/data/site.ts` and `src/i18n/ui.ts`, both structured as
`Record<"ro" | "en", T>` — every string has an explicit translation, there's no fallback
or auto-translation magic.

## Deployment

Astro is configured for static output (`astro build` → `dist/`). The `dist/` folder can be
deployed to any static host; `.htaccess` is included for Apache-based hosting (cPanel/shared hosting) and sets long-lived immutable caching on hashed build assets.

## About the Developer

Built by [@pRamonaNeagu](https://github.com/phayze2184).