<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $user_type = $_POST['user_type'];
    
    try {
        if ($user_type == 'student') {
            $stmt = $pdo->prepare("INSERT INTO student (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
            $name_parts = explode(' ', $name, 2);
            $first_name = $name_parts[0];
            $last_name = isset($name_parts[1]) ? $name_parts[1] : '';
            $stmt->execute([$first_name, $last_name, $email, $password]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO Faculty_Intern (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
            $name_parts = explode(' ', $name, 2);
            $first_name = $name_parts[0];
            $last_name = isset($name_parts[1]) ? $name_parts[1] : '';
            $stmt->execute([$first_name, $last_name, $email, $password]);
        }
        
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()]);
    }
}
?>