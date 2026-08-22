# SousaSaaS

Personal SaaS and web design portfolio and site.

Single static `index.html` — no build step, no dependencies.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site — markup, CSS, and JS inline. Fonts come from Google Fonts. |
| `vercel.json` | `cleanUrls` plus CSP and security headers. The CSP already allows `fonts.googleapis.com` and `fonts.gstatic.com`. |

## Before it goes live

1. **Add the canonical and `og:url`** once the real URL exists. There's a comment in `index.html` (~line 8) marking the spot. They're deliberately absent rather than placeholder — a canonical aimed at a domain that doesn't resolve suppresses the site in search, while a missing one just lets Google self-canonicalize.
2. **Add an OG image** if you want link previews to show art rather than plain text. Drop a 1200×630 into `assets/img/og.jpg`, add `og:image`, and switch `twitter:card` to `summary_large_image`.
3. **Check the prices** — Local Business $2,500 · Site & System $7,500 · Product $20,000 · care plan $75/mo or $750/yr · rush +50% · scope session $750 credited.

## Deploy

Vercel CLI, from this folder:

```bash
npx vercel --prod
```

Or connect the repo in the Vercel dashboard — it's a static site, so leave the build command empty and the output directory as the root.

## Local preview

```bash
npx serve .
```

## Notes

- No `robots` meta and no `X-Robots-Tag` — this site *should* be indexed. That's the opposite of the spec builds.
- The film grain is drawn to a `<canvas>` at runtime, so there's no image to ship.
- The scroll reveal has a 2.5s failsafe that shows everything if `IntersectionObserver` never fires. Don't remove it — without it a layout edge case leaves the page blank.
- `prefers-reduced-motion` disables the grain redraw, the reveal, and the wordmark glitch.
