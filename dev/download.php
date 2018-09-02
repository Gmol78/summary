<?php

define('FILE_NAME', 'resume_molochnikov_dev.pdf');

$root = dirname(__FILE__);
$path = $root.'/'.FILE_NAME;

if (file_exists($path)) {
    if (ob_get_level()) {
        ob_end_clean();
    }
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename=' . basename($path));
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($path));

if ($fd = fopen($path, 'rb')) {
    while (!feof($fd)) {
        print fread($fd, 1024);
    }
    fclose($fd);
}
}


