# Oscar Bucio, personal page

Single-page technical portfolio for Oscar Bucio (Backend / AI Engineer), built with Next.js 16 (App Router), Tailwind CSS v4, Motion, and Phosphor icons. The visual system uses an editorial infrastructure direction with automatic light and dark themes.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical, Open Graph, robots, sitemap, and structured data resolve to the final domain. Vercel deployments also fall back to `VERCEL_PROJECT_PRODUCTION_URL`.

## Production build

```bash
npm run build
npm start
```

Run `npm run check` for lint, TypeScript, and a full production build.

## Deploying to Vercel

Push the repository to GitHub and import it in Vercel; no extra configuration is needed. The site is fully static.

## Assets

- `public/images/portrait.jpg` is the optimized hero portrait (EXIF stripped).
- `public/images/system-topology.webp` is the editorial systems visual used in the engineering-principles section.
- Local source photography belongs in ignored `assets-src/`, never in `public/`.

## Structure

- `app/layout.tsx` - locally hosted Geist fonts, metadata, theme color
- `app/robots.ts` and `app/sitemap.ts` - crawl metadata generated from the configured site URL
- `app/globals.css` - semantic color tokens, focus states, grain, and reduced-motion fallbacks
- `lib/site.ts` - shared profile, social, email, and canonical URL configuration
- `components/` - one file per section: `nav`, `hero`, `facts`, `work`, `principles`, `experience`, `contact`
- `components/work-motion.tsx` - responsive case-study stack and technical flow visuals
- `components/page-progress.tsx` - reduced-motion-aware page progress indicator
- `components/reveal.tsx` - scroll-reveal wrapper (Motion), honors `prefers-reduced-motion`
