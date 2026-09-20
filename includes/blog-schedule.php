<?php
/**
 * Central scheduling helpers so blog posts auto-publish on a given calendar
 * date in the business's own timezone (America/Vancouver), regardless of
 * what timezone the web server itself is configured with.
 */

const BLOG_TIMEZONE = 'America/Vancouver';

function blog_now(): DateTimeImmutable
{
    return new DateTimeImmutable('now', new DateTimeZone(BLOG_TIMEZONE));
}

/**
 * $publishDate is 'YYYY-MM-DD'. The post is considered live starting
 * 12:00am Vancouver time on that date.
 */
function blog_is_published(string $publishDate): bool
{
    $publishAt = new DateTimeImmutable($publishDate . ' 00:00:00', new DateTimeZone(BLOG_TIMEZONE));
    return blog_now() >= $publishAt;
}

/**
 * Call at the very top of a scheduled post's own file, before any output.
 * Sends a real 404 and stops execution if the post's publish date hasn't
 * arrived yet in Vancouver time, so the URL isn't reachable or indexable
 * early even if someone guesses or crawls it.
 */
function blog_require_published(string $publishDate): void
{
    if (blog_is_published($publishDate)) {
        return;
    }
    http_response_code(404);
    header('X-Robots-Tag: noindex');
    include __DIR__ . '/blog-not-found.php';
    exit;
}
