<?php
require_once 'db.connection.php';
session_start();
header('Content-Type: application/json');

error_log("Registration attempt received: " . date('Y-m-d H:i:s'));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';
    
    error_log("Registration data - Name: $name, Email: $email, Role: $role");
    
    if (empty($name) || empty($email) || empty($password) || empty($role)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT email FROM student WHERE email = ? UNION SELECT email FROM Faculty_Intern WHERE email = ?");
        $stmt->execute([$email, $email]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already exists']);
            exit;
        }
        
        $names = explode(' ', $name, 2);
        $first_name = $names[0];
        $last_name = isset($names[1]) ? $names[1] : '';
        
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
    
        if ($role === 'Faculty Intern') {
            $stmt = $pdo->prepare("INSERT INTO Faculty_Intern (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
        } else {
            $stmt = $pdo->prepare("INSERT INTO student (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
        }
        
        $result = $stmt->execute([$first_name, $last_name, $email, $password_hash]);
        
        if ($result) {
            error_log("Registration successful for: $email");
            echo json_encode(['success' => true, 'message' => 'Registration successful! Please login.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed']);
        }
        
    } catch (PDOException $e) {
        error_log("Registration database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>