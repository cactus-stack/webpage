# Oscar Bucio, personal page

Single-page technical portfolio for Oscar Bucio (Backend / AI Engineer), built with Next.js 16 (App Router), Tailwind CSS v4, Motion, and Phosphor icons. The visual system uses an editorial systems-dossier direction with automatic light and dark themes.

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

## Deploying to Vercel

Push the repository to GitHub and import it in Vercel; no extra configuration is needed. The site is fully static.

## Assets

- `public/images/portrait.jpg` is the optimized hero portrait (4:5, EXIF stripped). The original photo is kept out of the deploy at `assets-src/picofmine.JPG`; re-export from there if you swap the crop.
- `public/images/system-topology.webp` is the optimized editorial systems visual used in the capabilities section.

## Structure

- `app/layout.tsx` - fonts (Geist / Geist Mono), metadata, theme color
- `app/robots.ts` and `app/sitemap.ts` - crawl metadata generated from the configured site URL
- `app/globals.css` - semantic color tokens, focus states, grain, and reduced-motion fallbacks
- `lib/site.ts` - shared profile, social, email, and canonical URL configuration
- `components/` - one file per section: `nav`, `hero`, `facts`, `experience`, `capabilities`, `stack`, `contact`
- `components/logos.tsx` - brand marks inlined from Simple Icons / Devicon, themed via `currentColor`
- `components/reveal.tsx` - scroll-reveal wrapper (Motion), honors `prefers-reduced-motion`
- `components/agent-diagram.tsx` - animated 2D agent-architecture diagram; server-rendered, theme-aware, and static under `prefers-reduced-motion`
