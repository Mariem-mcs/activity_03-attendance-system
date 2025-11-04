Drop database if exists System_Attendance_Management;
Create database System_Attendance_Management;
use System_Attendance_Management;

Create table Faculty_Intern(
    Faculty_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    PRIMARY KEY (Faculty_id));

Create table student(
    student_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    PRIMARY KEY (student_id)
);

Create table courses(
    Course_id INT NOT NULL AUTO_INCREMENT,
    Faculty_id INT NOT NULL,
    course_name VARCHAR(50),
    course_credit INT NOT NULL,
    course_season VARCHAR(50),
    PRIMARY KEY (Course_id),
    FOREIGN KEY (Faculty_id) REFERENCES Faculty_Intern(Faculty_id));

Create table student_courses(
    student_id INT NOT NULL,
    Course_id INT NOT NULL,
    PRIMARY KEY (student_id, Course_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (Course_id) REFERENCES courses(Course_id));

Create table Attendance(
    attendance_id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    Course_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Late') DEFAULT 'Absent',
    PRIMARY KEY (attendance_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (Course_id) REFERENCES courses(Course_id));
    
INSERT IGNORE INTO Faculty_Intern (first_name, last_name, email, password) 
VALUES ('Mr.', 'Kojo', 'kojo@ashesi.edu.gh', 'password123');

INSERT IGNORE INTO Faculty_Intern (first_name, last_name, email, password) 
VALUES ('Dr.', 'Ofori', 'ofori@ashesi.edu.gh', 'password123');

-- Insert test students (only if not exists)
INSERT IGNORE INTO student (first_name, last_name, email, password) 
VALUES ('Mariem', 'User', 'mariem@ashesi.edu.gh', 'password123');