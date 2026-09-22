# Oscar Bucio, personal page

Single-page technical portfolio for Oscar Bucio (Backend / AI Engineer), built with Next.js 16 (App Router), Tailwind CSS v4, Motion, and Phosphor icons. The visual system uses an editorial infrastructure direction with automatic light and dark themes.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Set `NEXT_PUBLIC_SITE_URL` to override the production origin used by canonical, Open Graph, robots, sitemap, and structured data. It defaults to `https://oscarbucio.dev`.

## Production build

```bash
npm run build     # static export into out/
npm run preview   # serve out/ through the local Workers runtime
```

Run `npm run check` for lint, TypeScript, and a full production build.

## Deploying to Cloudflare Workers

The site is a fully static Next.js export (`output: "export"`) served by an
assets-only Worker. Configuration lives in `wrangler.jsonc`.

Pushing to `main` triggers a Workers Build that runs `npm run build` and deploys
`out/` to https://oscarbucio.dev. Other branches get their own preview URL.

To deploy by hand (needs `wrangler login` once):

```bash
npm run deploy
```

Notes:

- Security headers are served from `public/_headers`, not `next.config.ts`.
  A `headers()` function has no effect under `output: "export"`.
- `next/image` runs with `unoptimized: true`; there is no image optimizer at
  request time, so ship pre-sized assets.
- Metadata routes (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`) each need
  `export const dynamic = "force-static"` to be emitted at build time.

## Assets

- `public/images/portrait.webp` is the hero portrait; `public/images/portrait.jpg` is the same crop for the Open Graph card and structured data. Both are grayscale with metadata stripped (the source photo carries GPS data).
- `public/OscarBucio_Resume.pdf` is the résumé linked from the nav, hero, contact list and footer. Replace the file to update it; keep the name.
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
