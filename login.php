<?php
include 'db_connection.php';

// Debug: Check if we're receiving the request
error_log("Login request received");
file_put_contents('debug.log', "Login attempt: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    error_log("Email: $email, Password: $password");
    
    // Check in students table
    $stmt = $pdo->prepare("SELECT * FROM student WHERE email = ? AND password = ?");
    $stmt->execute([$email, $password]);
    $student = $stmt->fetch();
    
    if ($student) {
        error_log("Student login successful");
        echo json_encode(['success' => true, 'user_type' => 'student', 'user' => $student]);
        exit;
    }
    
    // Check in faculty table
    $stmt = $pdo->prepare("SELECT * FROM Faculty_Intern WHERE email = ? AND password = ?");
    $stmt->execute([$email, $password]);
    $faculty = $stmt->fetch();
    
    if ($faculty) {
        error_log("Faculty login successful");
        echo json_encode(['success' => true, 'user_type' => 'faculty', 'user' => $faculty]);
        exit;
    }
    
    error_log("Login failed - no user found");
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
} else {
    error_log("Invalid request method");
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>