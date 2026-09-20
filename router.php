<?php
/**
 * Router for PHP's built-in development server.
 * Mirrors the extensionless URL behavior configured in .htaccess for production.
 */
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rawurldecode($path ?: '/');

if ($path === '/') {
    require __DIR__ . '/index.php';
    return true;
}

if ($path === '/sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    return true;
}

$documentRoot = realpath(__DIR__);
$requestedFile = realpath(__DIR__ . $path);
if ($requestedFile !== false && str_starts_with($requestedFile, $documentRoot . DIRECTORY_SEPARATOR) && is_file($requestedFile)) {
    return false;
}

$cleanPath = rtrim($path, '/');
$phpFile = realpath(__DIR__ . $cleanPath . '.php');

if ($phpFile !== false && str_starts_with($phpFile, $documentRoot . DIRECTORY_SEPARATOR) && is_file($phpFile)) {
    require $phpFile;
    return true;
}

http_response_code(404);
header('Content-Type: text/plain; charset=UTF-8');
echo '404 Not Found';
return true;
