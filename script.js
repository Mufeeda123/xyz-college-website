// ===== Scroll Down Arrow =====
const arrow = document.getElementById("scroll-arrow");
const aboutSection = document.getElementById("about");

arrow.addEventListener("click", (e) => {
  e.preventDefault();
  // Scroll so the about section appears partially first
  const partialOffset = window.innerHeight * 0.45;
  const targetScroll = aboutSection.offsetTop - partialOffset;
  window.scrollTo({ top: targetScroll, behavior: "smooth" });
});

// ===== Sidebar Toggle =====
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");

const openSidebar = () => {
  sidebar.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
};
const closeSidebar = () => {
  sidebar.classList.add("translate-x-full");
  overlay.classList.add("hidden");
};

menuBtn.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// ===== About Section Partial Reveal =====
const revealSections = () => {
  const sections = document.querySelectorAll("section[id]");
  const triggerBottom = window.innerHeight * 0.8;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// ===== Contact Form =====
const form = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation
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

  // Success
  showFormNotification("Good job! Form submitted successfully!", "green");
  form.reset();

  // Show modal
  successModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  successModal.classList.remove("show");
});

// ===== Form Notification =====
function showFormNotification(message, color = "green") {
  const existing = document.getElementById("form-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.id = "form-notification";
  notification.textContent = message;

  Object.assign(notification.style, {
    backgroundColor:
      color === "red" ? "#EF4444" : color === "blue" ? "#3B82F6" : "#22C55E",
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
