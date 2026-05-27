<?php
// Start a session for login persistence
session_start();

// Database credentials – CHANGE these to match your hosting
$host = 'localhost';          // Usually 'localhost'
$dbname = 'chrisreal_db';     // The database name you created
$username = 'your_db_user';   // Your database username (from hosting)
$password = 'your_db_pass';   // Your database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Base URL (change if your site is in a subfolder like /school/)
define('BASE_URL', '/');
?>