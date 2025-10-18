// DOM Elements
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginContent = document.getElementById('login-content');
const registerContent = document.getElementById('register-content');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authContainer = document.getElementById('auth-container');
const welcomePage = document.getElementById('welcome-page');
const dashboard = document.getElementById('dashboard');
const welcomeMessage = document.getElementById('welcome-message');
const welcomeText = document.getElementById('welcome-text');
const dashboardLogout = document.getElementById('dashboard-logout');

// Courses data
const courses = [
  {
    "name": "Web Technologies",
    "code": "CS350",
    "instructor": "Mr. Kojo",
    "auditors": ["Hutton", "Barbara"],
    "attendance": 92
  },
  {
    "name": "Database Systems",
    "code": "CS370",
    "instructor": "Dr. Ofori",
    "auditors": ["Maame"],
    "attendance": 85
  },
  {
    "name": "Finance for non finance managers",
    "code": "BUSA224",
    "instructor": "Dr Kweku",
    "auditors": ["Yaw"],
    "attendance": 78
  }
];

// Tab Switching for Auth
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginContent.classList.add('active');
    registerContent.classList.remove('active');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerContent.classList.add('active');
    loginContent.classList.remove('active');
});

// Dashboard Tab Switching
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Show selected tab content
        const tabId = link.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
    });
});

// Load Courses
function loadCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-header">
                <div class="course-info">
                    <h4>${course.name}</h4>
                    <div class="course-code">${course.code}</div>
                </div>
                <div class="attendance-badge">${course.attendance}%</div>
            </div>
            <div class="course-details">
                <div class="course-instructor">Instructor: ${course.instructor}</div>
                <div class="course-auditors">Auditors: ${course.auditors.join(', ')}</div>
            </div>
            <div class="course-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.attendance}%"></div>
                </div>
                <div class="progress-text">
                    <span>Attendance</span>
                    <span>${course.attendance}%</span>
                </div>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

// Prevent multiple user type selection
document.querySelectorAll('input[name="user-type"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('input[name="user-type"]').forEach(other => {
                if (other !== this) other.checked = false;
            });
        }
    });
});

// Login Form - Shows Dashboard immediately
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const firstName = email.split('@')[0];
    
    // Update profile name
    document.getElementById('profile-name').textContent = firstName + ' User';
    
    // Hide auth container and show dashboard immediately
    authContainer.style.display = 'none';
    welcomePage.style.display = 'none';
    dashboard.style.display = 'block';
    welcomeText.textContent = `Welcome, ${firstName}!`;
    
    // Load courses
    loadCourses();
});

// Register Form - Only shows success message and switches to login
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('reg-name').value;
    const facultyChecked = document.getElementById('Faculty-Intern').checked;
    const studentChecked = document.getElementById('Student').checked;
    
    // Validate user type selection
    if (!facultyChecked && !studentChecked) {
        alert('Please select either Faculty Intern or Student');
        return;
    }
    
    // Show success message
    alert('Registration successful! Please login with your credentials.');
    
    // Switch to login tab and reset form
    switchToLoginTab();
    registerForm.reset();
});

// Function to switch to login tab
function switchToLoginTab() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginContent.classList.add('active');
    registerContent.classList.remove('active');
}

// Dashboard Logout
dashboardLogout.addEventListener('click', () => {
    dashboard.style.display = 'none';
    authContainer.style.display = 'block';
    // Reset forms
    loginForm.reset();
    registerForm.reset();
});