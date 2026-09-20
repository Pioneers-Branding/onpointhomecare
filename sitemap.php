<?php
/**
 * Dynamic sitemap. Static site pages are listed as before; blog posts are
 * pulled from includes/blog-index-data.php and only included once their
 * publish_date has arrived in Vancouver time, via blog_is_published().
 * Served at /sitemap.xml by a rewrite rule in .htaccess (and by router.php
 * for the local dev server), so nothing else needs to change to keep it in
 * sync as scheduled posts go live.
 */

require_once __DIR__ . '/includes/blog-schedule.php';
require_once __DIR__ . '/includes/blog-index-data.php';

header('Content-Type: application/xml; charset=UTF-8');

$staticPages = require __DIR__ . '/includes/sitemap-static-pages.php';

$blogEntries = [];
foreach ($BLOG_POSTS as $post) {
    if (!blog_is_published($post['publish_date'])) {
        continue;
    }
    $blogEntries[] = [
        'path' => '/' . $post['slug'],
        'lastmod' => $post['publish_date'],
        'changefreq' => 'monthly',
        'priority' => '0.7',
    ];
}

$allEntries = array_merge($staticPages, $blogEntries);

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($allEntries as $entry) {
    $loc = 'https://onpointhomecare.care' . $entry['path'];
    echo "  <url>\n";
    echo '    <loc>' . htmlspecialchars($loc, ENT_XML1) . "</loc>\n";
    echo '    <lastmod>' . htmlspecialchars($entry['lastmod'], ENT_XML1) . "</lastmod>\n";
    echo '    <changefreq>' . htmlspecialchars($entry['changefreq'], ENT_XML1) . "</changefreq>\n";
    echo '    <priority>' . htmlspecialchars($entry['priority'], ENT_XML1) . "</priority>\n";
    echo "  </url>\n";
}
echo '</urlset>' . "\n";
