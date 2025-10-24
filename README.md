# Portfolio Hub

A clean, modern portfolio website built with Next.js 16 and TypeScript.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js 20
- **Package Manager**: pnpm

## Routes

- `/` - Home page with navigation links
- `/projects` - Portfolio projects showcase
- `/about` - About page
- `/contact` - Contact information

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## SEO Configuration

This project includes comprehensive SEO configuration using Next.js App Router's built-in metadata API.

### Configuration Files

- `next-seo.config.ts` - Base SEO configuration with site-wide defaults
- Each page can override metadata using the `generateMetadata` function

### Open Graph Images

For optimal social media sharing, add the following images to the `public` directory:

- `og.png` (1200x630px) - Default Open Graph image for social sharing
- `apple-touch-icon.png` (180x180px) - Apple touch icon for iOS devices
- `favicon.ico` - Browser favicon

### Customization

1. Update the site configuration in `next-seo.config.ts`:

   ```typescript
   export const seoConfig = {
     siteName: "Your Portfolio Name",
     defaultTitle: "Your Portfolio - Your Tagline",
     description: "Your portfolio description...",
     url: "https://your-domain.com",
     ogImage: "/og.png",
   }
   ```

2. Replace placeholder images in the `public` directory with your branded assets

3. Update social media handles in the Twitter configuration

### SEO Features

- ✅ Dynamic page titles with site template
- ✅ Meta descriptions for all pages
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Canonical URLs
- ✅ robots.txt directives
- ✅ Structured data for projects
- ✅ Image optimization for social previews
