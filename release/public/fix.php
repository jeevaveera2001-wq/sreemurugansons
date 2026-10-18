<?php
// Sree Murugan Sons - Automatic Backslash to Linux Directory Converter
header('Content-Type: text/plain; charset=utf-8');
$dir = __DIR__;
$files = scandir($dir);
$fixedCount = 0;

echo "=== SREE MURUGAN SONS HOSTINGER AUTO-FIX TOOL ===\n";
echo "Scanning directory: $dir\n\n";

// Auto-Extract if zip exists
$zipFile = $dir . '/hostinger-frontend-public_html.zip';
if (file_exists($zipFile) && class_exists('ZipArchive')) {
    echo "Found $zipFile. Extracting latest build...\n";
    $zip = new ZipArchive;
    if ($zip->open($zipFile) === TRUE) {
        $zip->extractTo($dir);
        $zip->close();
        echo "Successfully extracted latest build!\n";
    } else {
        echo "Failed to open zip archive.\n";
    }
}

foreach ($files as $file) {
    if (strpos($file, '\\') !== false) {
        $parts = explode('\\', $file);
        $current = $dir;
        for ($i = 0; $i < count($parts) - 1; $i++) {
            $current .= '/' . $parts[$i];
            if (!is_dir($current)) {
                mkdir($current, 0755, true);
            }
        }
        $target = $dir . '/' . str_replace('\\', '/', $file);
        if (rename($dir . '/' . $file, $target)) {
            echo "FIXED: $file -> " . str_replace('\\', '/', $file) . "\n";
            $fixedCount++;
        } else {
            echo "FAILED to rename: $file\n";
        }
    }
}

echo "\n----------------------------------------\n";
echo "Total files fixed into proper Linux folders: $fixedCount\n";
echo "Assets directory exists: " . (is_dir($dir . '/assets') ? 'YES' : 'NO') . "\n";
if (is_dir($dir . '/assets')) {
    echo "Files inside assets/:\n";
    print_r(scandir($dir . '/assets'));
}
echo "\nFix complete! You can now visit https://sremurugansons.com/\n";
?>
