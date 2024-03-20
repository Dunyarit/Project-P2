<?php
    $db_host = 'localhost';
    $db_name = 'food';
    $db_user = 'root';
    $db_pass = '';

    header('Content-Type: application/json');

    try {
        $db = new PDO("mysql:host=${db_host}; dbname=${db_name}", $db_user,$db_pass);
        db->setAttributte(PDO::ATTR_ERRMODE, PDO::ATTR_ERRMODE_EXCEPTION);
        // echo "database is connected";
    }
    catch(PEOException $e) {
        echo $e->getMessage();
    }
?>

