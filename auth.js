// Get the elements by Ids
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

// Add the eventListeners for Register and Login 
if (showRegister) {
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
  });
}

if (showLogin) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;
    const role = document.getElementById("register-role").value;

    // The validation that are required
    if (!name || !email || !password || !confirmPassword || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Save user 
    const user = { name, email, password, role };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Please login.");
    registerForm.reset();
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });
}


if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      // Save a session
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      
      // Redirect by role ofuser 
      if (storedUser.role === "Faculty Intern") {
        window.location.href = "faculty-dashboard.html";
      } else {
        window.location.href = "student-dashboard.html";
      }
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}
