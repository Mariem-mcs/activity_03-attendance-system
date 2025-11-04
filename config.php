<?php
$host = "localhost";           
$username = "root";            
$password = "mariem@sall19052003";      
$database = "System_Attendance_Management"; 

function getDBConnection() {
    global $host, $username, $password, $database;
    
    $conn = new mysqli($host, $username, $password, $database);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn; // Fixed syntax error (removed invisible character)
}
?>