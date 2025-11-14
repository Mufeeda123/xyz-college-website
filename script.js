// Scroll down arrow
const arrow = document.getElementById("scroll-arrow");
const aboutSection = document.getElementById("about");

arrow.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: aboutSection.offsetTop, behavior: "smooth" });
});
// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => { sidebar.classList.remove("translate-x-full"); overlay.classList.remove("hidden"); });
const closeSidebar = () => { sidebar.classList.add("translate-x-full"); overlay.classList.add("hidden"); };
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Contact Form
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) {
    showFormNotification("Please fill in all fields!", "red");
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showFormNotification("Invalid email address!", "red");
    return;
  }
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    showFormNotification("Phone number must be 10 digits!", "red");
    return;
  }
  // Success: only show inline notification
  showFormNotification("Form submitted successfully!", "green");
  form.reset();
});

function showFormNotification(message, color = "green") {
  const existing = document.getElementById("form-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.id = "form-notification";
  notification.textContent = message;

  Object.assign(notification.style, {
    backgroundColor: color === "red" ? "#EF4444" : "#22C55E",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    position: "absolute",
    width: "100%",
    top: "-60px",
    left: "0",
    opacity: "0",
    transform: "translateY(-20px)",
    zIndex: "50",
  });
  form.prepend(notification);
  requestAnimationFrame(() => {
    notification.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  });
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-20px)";
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}
