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
    PRIMARY KEY (Faculty_id)
);

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
    session_type ENUM('lecture', 'lab') DEFAULT 'lecture',
    session_notes TEXT,
    PRIMARY KEY (Course_id),
    FOREIGN KEY (Faculty_id) REFERENCES Faculty_Intern(Faculty_id)
);

Create table student_courses(
    student_id INT NOT NULL,
    Course_id INT NOT NULL,
    PRIMARY KEY (student_id, Course_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (Course_id) REFERENCES courses(Course_id)
);

Create table Attendance(
    attendance_id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    Course_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Late') DEFAULT 'Absent',
    -- NEW: Session type for each attendance record
    session_type ENUM('lecture', 'lab') DEFAULT 'lecture',
    PRIMARY KEY (attendance_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (Course_id) REFERENCES courses(Course_id)
);

Create table attendance_issues(
    issue_id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_name VARCHAR(100),
    session_date DATE,
    issue_description TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'resolved') DEFAULT 'pending',
    PRIMARY KEY (issue_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);


INSERT IGNORE INTO Faculty_Intern (first_name, last_name, email, password) 
VALUES ('Mr.', 'Kojo', 'kojo@ashesi.edu.gh', 'password123');

INSERT IGNORE INTO Faculty_Intern (first_name, last_name, email, password) 
VALUES ('Dr.', 'Ofori', 'ofori@ashesi.edu.gh', 'password123');

INSERT IGNORE INTO student (first_name, last_name, email, password) 
VALUES ('Mariem', 'Sall', 'mariem@ashesi.edu.gh', 'password123');

INSERT IGNORE INTO student (first_name, last_name, email, password) 
VALUES ('John', 'Doe', 'john@ashesi.edu.gh', 'password123');

INSERT IGNORE INTO courses (Faculty_id, course_name, course_credit, course_season, session_type, session_notes) 
VALUES 
(1, 'Web Technologies', 3, 'Fall 2024', 'lecture', 'Regular classroom sessions'),
(1, 'Web Technologies Lab', 1, 'Fall 2024', 'lab', 'Bring your laptops with VS Code installed'),
(2, 'Database Systems', 3, 'Fall 2024', 'lecture', 'Theory and concepts'),
(2, 'Database Lab', 1, 'Fall 2024', 'lab', 'MySQL workbench required');


INSERT IGNORE INTO Attendance (student_id, Course_id, attendance_date, status, session_type) 
VALUES 
(1, 1, '2024-10-01', 'Present', 'lecture'),
(1, 2, '2024-10-02', 'Present', 'lab'),
(1, 1, '2024-10-08', 'Late', 'lecture'),
(2, 1, '2024-10-01', 'Absent', 'lecture');