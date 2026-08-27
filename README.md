# SousaSaaS

A fast, accessible marketing site for **SousaSaaS**, an independent web design and development practice based in Windsor, Connecticut.

The live project is currently served at [sousasaas.vercel.app](https://sousasaas.vercel.app/). The `sousasaas.com` custom domain has not been configured for this repository; do not add it to canonical tags, sitemap URLs, Open Graph metadata, or email addresses until DNS, hosting, and the mailbox are confirmed.

## What is included

The site is a dependency-light static implementation. It provides a responsive marketing page, a client-side inquiry form that opens a pre-filled email in the visitor’s own mail application, a privacy notice, social-preview metadata, a sitemap, and crawler controls.

| Area                         | Location                                                              |
| ---------------------------- | --------------------------------------------------------------------- |
| Main page                    | `index.html`                                                          |
| Shared styles                | `styles.css`                                                          |
| Client-side inquiry behavior | `app.js`                                                              |
| Privacy notice               | `privacy/index.html`                                                  |
| Social-preview image         | `images/og-image.jpg`                                                 |
| Security and cache headers   | `vercel.json`                                                         |
| Quality checks               | `package.json`, `.htmlvalidate.json`, `scripts/check-local-links.mjs` |
| Continuous integration       | `.github/workflows/quality.yml`                                       |

## Local development

Use Node.js 22 or later.

```bash
npm ci
npm test
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser while the local server is running. The site has no build step; Vercel serves the tracked static files directly.

## Quality checks

`npm test` runs three release checks:

| Command                | Purpose                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run format:check` | Ensures source files follow the shared Prettier configuration.    |
| `npm run lint:html`    | Detects invalid or inconsistent HTML.                             |
| `npm run test:links`   | Detects broken local routes and static assets referenced by HTML. |

GitHub Actions runs these checks on pull requests and pushes to `main`. Enable branch protection in GitHub so changes to `main` require a passing workflow and review before merging.

## Content and contact updates

The website intentionally does not submit contact-form data to an application endpoint. It prepares a visitor-controlled email to `contact@sousasaas.com`. Before publishing a custom domain, verify that this mailbox can receive messages. Replace service descriptions, engagement ranges, and contact details only with information that has been approved for public use.

## Deployment checklist

1. Create a branch and make the required content or code changes.
2. Run `npm test` locally.
3. Review the Vercel preview at desktop and mobile widths. Confirm that the site is styled, the inquiry form opens a drafted email, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, and `/images/og-image.jpg` return 200, and the page has the expected metadata.
4. Merge the approved change to `main` and wait for the Git-linked Vercel deployment to be READY.
5. Confirm the production alias serves the newly approved commit—not an earlier redeploy. Check the title, canonical URL, response status, security policy, form behavior, and the core routes again on production.
6. If a custom domain is later configured, update the canonical tag, Open Graph URLs, sitemap, `robots.txt`, contact email address, and this README in the same pull request. Verify HTTPS, both apex and `www` redirect behavior, and mail delivery before requesting indexing.

## Privacy notice

`privacy/index.html` is a working website privacy notice based on the current static implementation, which includes Vercel delivery, Google Fonts, and a mail-client inquiry form. It is not legal advice. Have qualified counsel review it before relying on it, especially if the site adds analytics, advertising pixels, form processing, account features, e-commerce, or visitors in additional jurisdictions.

## Security model

The project uses a restrictive Content Security Policy that permits only same-origin scripts and local styles, plus the Google Fonts stylesheet and font origins. Keep application styles in `styles.css` and JavaScript in `app.js`; do not add inline style or script blocks without deliberately updating and validating the policy. Production HTTPS, HSTS, frame protection, a restrictive permissions policy, and a strict referrer policy are configured in `vercel.json`.
