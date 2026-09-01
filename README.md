# OnPoint Nurse & Home Care

Static marketing site. Every page is its own document at its own URL — there is
no framework, no runtime dependency, and the output is plain HTML any static
host will serve.

## Layout

```
src/
  partials/header.html   top bar, header, nav, mobile drawer
  partials/footer.html   sticky bar, WhatsApp modal, toast, footer
  pages/*.html           the body of one page each
  routes.js              every URL the nav can point at
  pages.js               which pages get built, and their <head> metadata
build.js                 composes the above into static HTML
styles.css               single stylesheet
app.js                   on-page behaviour only (drawer, forms, wizard, modals)
```

Everything in the project root other than `src/`, `build.js`, `styles.css`,
`app.js` and `assets/` is **generated** — `index.html`, `about-us/`, `services/`
and so on. Edit the sources, not the output.

## Build

```
npm run build     # regenerate all pages
npm run serve     # build, then serve at http://localhost:3000
```

Use `npm run serve` (or any static server) for local preview. Opening the files
directly with `file://` will not work, because the links point at directory URLs
like `/about-us/` and only a web server resolves those to `index.html`.

## Pages

| URL | Source |
| --- | --- |
| `/` | `src/pages/home.html` |
| `/about-us/` | `src/pages/about.html` |
| `/services/` | `src/pages/services.html` |
| `/dementia-care/` | `src/pages/dementia-care.html` |
| `/our-care-team/` | `src/pages/team.html` |
| `/resources/` | `src/pages/resources.html` |
| `/faqs/` | `src/pages/faqs.html` |
| `/contact/` | `src/pages/contact.html` |
| `/care-assessment/` | `src/pages/assessment.html` |

## Pages not built yet

The navigation follows the client sitemap, so it links to 33 URLs that have no
content yet (`/home-nursing/`, `/locations/vancouver/`, `/refer-a-patient/`,
`/reviews/`, and so on). Those are listed in `src/routes.js` as `soon(...)`.
Their links carry `data-soon`, and `app.js` answers a click with a "coming soon"
message instead of a 404.

To launch one:

1. Add `src/pages/<name>.html` with the page body.
2. In `src/routes.js`, change that route from `soon(...)` to `built(...)`.
3. Add an entry to `src/pages.js` with its title and description.
4. `npm run build`.

Every link to it across the site starts working at once — no page-by-page edits.

## Paths

Partials and page bodies write asset and internal links as `{{base}}...`. The
build replaces that per page with the relative hop back to the root (`` at the
root, `../` one level down), so a page works wherever the site is mounted.
