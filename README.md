# Oscar Bucio, personal page

Single-page portfolio for Oscar Daniel Bucio Barrera (Backend / AI Engineer), built with Next.js 16 (App Router), Tailwind CSS v4, Motion, and Phosphor icons. Light and dark themes follow the system preference (`prefers-color-scheme`).

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploying to Vercel

Push the repository to GitHub and import it in Vercel; no extra configuration is needed. The site is fully static.

## Assets

- `public/images/portrait.jpg` is the optimized hero portrait (4:5, EXIF stripped). The original photo is kept out of the deploy at `assets-src/picofmine.JPG`; re-export from there if you swap the crop.

## Structure

- `app/layout.tsx` - fonts (Geist / Geist Mono), metadata, theme color
- `app/globals.css` - semantic color tokens, marquee animation, reduced-motion fallbacks
- `components/` - one file per section: `nav`, `hero`, `facts`, `experience`, `capabilities`, `stack`, `contact`
- `components/logos.tsx` - brand marks inlined from Simple Icons / Devicon, themed via `currentColor`
- `components/reveal.tsx` - scroll-reveal wrapper (Motion), honors `prefers-reduced-motion`
