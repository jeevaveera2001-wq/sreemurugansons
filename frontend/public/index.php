<?php
// SREE MURUGAN SONS - Hostinger Single Web Hosting Gateway & Asset Router
$baseDir = __DIR__;
$assetsDir = $baseDir . '/assets';
$imagesDir = $baseDir . '/images';
$zipFile = $baseDir . '/hostinger-frontend-public_html.zip';

// 1. Auto-Repair: Convert any Windows backslash filenames into proper Linux directory structures
$scanFiles = @scandir($baseDir) ?: [];
foreach ($scanFiles as $f) {
    if (strpos($f, '\\') !== false) {
        $parts = explode('\\', $f);
        $curr = $baseDir;
        for ($i = 0; $i < count($parts) - 1; $i++) {
            $curr .= '/' . $parts[$i];
            if (!is_dir($curr)) {
                @mkdir($curr, 0755, true);
            }
        }
        $target = $baseDir . '/' . str_replace('\\', '/', $f);
        @rename($baseDir . '/' . $f, $target);
    }
}

// Auto-Repair: If assets folder is still missing, check nested folders or zip
if (!is_dir($assetsDir)) {
    $nestedFolder = $baseDir . '/hostinger-frontend-public_html';
    if (is_dir($nestedFolder . '/assets')) {
        @rename($nestedFolder . '/assets', $assetsDir);
        @rename($nestedFolder . '/images', $imagesDir);
    } elseif (file_exists($zipFile) && class_exists('ZipArchive')) {
        $zip = new ZipArchive;
        if ($zip->open($zipFile) === TRUE) {
            $zip->extractTo($baseDir);
            $zip->close();
        }
    }
}

// 2. Direct Static Asset Server with Strict MIME Types (Prevents White Blank Screen)
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$cleanPath = ltrim($uri, '/');
$targetFile = $baseDir . '/' . $cleanPath;

if (!empty($cleanPath) && file_exists($targetFile) && is_file($targetFile)) {
    $ext = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $mimeTypes = [
        'js'   => 'application/javascript; charset=utf-8',
        'mjs'  => 'application/javascript; charset=utf-8',
        'css'  => 'text/css; charset=utf-8',
        'json' => 'application/json; charset=utf-8',
        'svg'  => 'image/svg+xml',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'webp' => 'image/webp',
        'ico'  => 'image/x-icon',
        'woff2'=> 'font/woff2',
        'woff' => 'font/woff',
        'ttf'  => 'font/ttf',
    ];

    if (isset($mimeTypes[$ext])) {
        header('Content-Type: ' . $mimeTypes[$ext]);
        header('Cache-Control: public, max-age=31536000');
        readfile($targetFile);
        exit;
    }
}

// 3. Fallback: Serve index.html for Root and SPA Client-Side Routing
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

if (file_exists($baseDir . '/index.html')) {
    readfile($baseDir . '/index.html');
    exit;
}

echo '<!doctype html><html><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>SREE MURUGAN SONS</h2><p>Application files are loading. Please refresh in a moment.</p></body></html>';
?>
