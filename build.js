#!/usr/bin/env node
/**
 * Static site build for OnPoint Nurse & Home Care.
 *
 * Composes each page from src/partials (header, footer) plus its body in
 * src/pages, and writes plain static HTML to the project root:
 *
 *   src/pages/about.html  ->  about-us/index.html   (served as /about-us/)
 *
 * There is no framework and no runtime dependency: the output is ordinary HTML
 * that any static host will serve. Run it with `npm run build`.
 *
 * Paths in the partials are written as {{base}}, replaced per page with the
 * relative hop back to the root ('' at the root, '../' one level down), so the
 * output works from a subdirectory or straight off the filesystem.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const { ROUTES } = require(path.join(SRC, 'routes.js'));
const { PAGES } = require(path.join(SRC, 'pages.js'));

const read = (...p) => fs.readFileSync(path.join(...p), 'utf8');

const header = read(SRC, 'partials', 'header.html');
const footer = read(SRC, 'partials', 'footer.html');

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/** Relative prefix from a page's own directory back to the site root. */
function baseFor(url) {
  const depth = url.split('/').filter(Boolean).length;
  return depth === 0 ? '' : '../'.repeat(depth);
}

/** Mark the nav item for the current page so it renders in the active state. */
function setActiveNav(html, navKey) {
  if (!navKey) return html;
  return html.replace(
    new RegExp(`(<a\\b[^>]*?)class="nav-item([^"]*)"([^>]*?data-page="${navKey}")`),
    '$1class="nav-item$2 active"$3'
  );
}

function layout({ title, description, base, body, navKey }) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${escapeAttr(description)}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet">

  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="${base}styles.css">
  <link rel="icon" type="image/png" href="${base}assets/images/favicon.png">
</head>

<body>

${setActiveNav(header, navKey).trimEnd()}

  <main id="mainContent">
${body}
  </main>

${footer.trimEnd()}

  <!-- Core JavaScript -->
  <script src="${base}app.js"></script>
</body>

</html>
`;
}

function indent(text, spaces) {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((l) => (l.trim() ? pad + l : l))
    .join('\n');
}

let written = 0;
const emitted = [];

for (const page of PAGES) {
  const route = ROUTES[page.route];
  if (!route) throw new Error(`pages.js references unknown route "${page.route}"`);
  if (route.soon) {
    throw new Error(
      `Route "${page.route}" is still marked soon() in routes.js but has a page body. ` +
        `Switch it to built() so its links stop being intercepted.`
    );
  }

  const base = baseFor(route.url);
  const body = indent(read(SRC, 'pages', page.body).trimEnd(), 4);
  const html = layout({
    title: page.title,
    description: page.description,
    base,
    body,
    navKey: page.nav,
  }).replace(/\{\{base\}\}/g, base);

  const outPath = route.url === '' ? path.join(ROOT, 'index.html') : path.join(ROOT, route.url, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);

  written++;
  emitted.push({ url: '/' + route.url, file: path.relative(ROOT, outPath), bytes: html.length });
}

const soonCount = Object.values(ROUTES).filter((r) => r.soon).length;

console.log(`Built ${written} pages\n`);
for (const e of emitted) {
  console.log(`  ${e.url.padEnd(20)} ${e.file.padEnd(28)} ${(e.bytes / 1024).toFixed(1).padStart(6)} KB`);
}
console.log(`\n  ${soonCount} routes still marked "coming soon" in src/routes.js`);
