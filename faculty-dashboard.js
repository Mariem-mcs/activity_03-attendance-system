/*To retrieve the logged-in user’s data from the browser’s localStorage.
JSON.parse() converts the stored JSON string back into a JavaScript object.
If no user is found, it redirect to the login page.
It also handles logout by clearing user data and returning to the login page.*/

const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) window.location.href = "index.html";

//To Show the user’s name and role on the dashboard
document.getElementById("welcome").textContent = `Welcome, ${user.name} (${user.role})`;

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});
