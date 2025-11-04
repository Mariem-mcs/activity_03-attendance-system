<?php
require_once 'db.connection.php';
session_start();

header('Content-Type: application/json');

error_log("Login attempt received: " . date('Y-m-d H:i:s'));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    error_log("Email: $email, Password length: " . strlen($password));
    
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }
    
    try {
        // Check in student table first
        $stmt = $pdo->prepare("SELECT *, 'Student' as role FROM student WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // If not found in student, check in faculty table
        if (!$user) {
            $stmt = $pdo->prepare("SELECT *, 'Faculty Intern' as role FROM Faculty_Intern WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        
        error_log("User found: " . ($user ? 'Yes' : 'No'));
        
        if ($user) {
            // For testing with plain text passwords (temporary)
            if ($password === $user['password'] || password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['student_id'] ?? $user['Faculty_id'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['name'] = $user['first_name'] . ' ' . $user['last_name'];
                $_SESSION['role'] = $user['role'];
                
                error_log("Login successful for: " . $user['email'] . " with role: " . $user['role']);
                
                echo json_encode([
                    'success' => true, 
                    'role' => $user['role'],
                    'message' => 'Login successful'
                ]);
            } else {
                error_log("Password verification failed");
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
            }
        } else {
            error_log("No user found with email: $email");
            echo json_encode(['success' => false, 'message' => 'No account found with this email']);
        }
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>