# San Electroterm Grup Website

Static marketing website built with [Astro](https://astro.build/) for San Electroterm Grup.

The project includes:
- a homepage with services, portfolio, certifications marquee, and contact form
- an About page
- a Certifications page with downloadable PDF documents
- a PHP contact endpoint for form submission

## Tech Stack

- Astro 6
- TypeScript with Astro strict config
- Plain CSS split into global, layout, component, and page-level styles
- Static assets served from `public/`

## Project Structure

```text
.
├── public/
│   ├── assets/               # Images, logos, certification PDFs
│   ├── scripts/app.js        # Client-side interactions
│   └── contact.php           # Contact form backend endpoint
├── src/
│   ├── components/           # Reusable Astro components
│   ├── data/site.ts          # Site content, navigation, certifications, services
│   ├── layouts/              # Base page layout
│   ├── pages/                # Route files
│   └── styles/               # Global and page-specific CSS
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Pages

- `/` - homepage
- `/about` - company presentation page
- `/certificari` - certification archive with PDF downloads

## Getting Started

### Requirements

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Content Editing

Most editable site content lives in:

- `src/data/site.ts`

This file contains:
- site metadata
- header navigation
- certification documents
- homepage certification logos
- services
- portfolio entries
- about page content
- management team data

### Certifications

Two different certification datasets are used:

- `certificationDocuments`
  Used on `/certificari`
  Points to downloadable PDF files from `public/assets`

- `certifications`
  Used on the homepage marquee
  Points to image assets for the scrolling certification strip


## Styling

CSS is organized by responsibility:

- `src/styles/global.css`
  Tokens, reset, base styles, utilities, accessibility rules

- `src/styles/layout.css`
  Shared page layout, header, footer, structural sections

- `src/styles/components.css`
  Shared UI components such as buttons, navigation details, form UI

- `src/styles/index.css`
  Homepage-specific styles

- `src/styles/about.css`
  About page styles

- `src/styles/certificari.css`
  Certifications page styles

## Contact Form

The contact form posts to:

- `public/contact.php`

This endpoint expects SMTP configuration from one of these locations:

- `private/contact.config.php`
- `public/contact.config.php`
- a custom path via `CONTACT_CONFIG_PATH`

An example config file is included here:

- `public/contact.config.example.php`

Important:
- the static Astro build does not handle email by itself
- `contact.php` must run on a PHP-capable server
- SMTP credentials must be configured separately in deployment

## Deployment Notes

- Astro is configured with `output: "static"` in `astro.config.mjs`
- built files are generated in `dist/`
- `public/` files are copied through as static assets
- certification PDFs in `public/assets/` are publicly accessible by design

## Useful Commands

```bash
npm run dev
npm run build
npm run preview
```


