// Automatically set the current year in the footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Theme toggle with local storage ===
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Fade in animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.2,
    }
  );

  document
    .querySelectorAll("section, header")
    .forEach((el) => observer.observe(el));

  // Copy email to clipboard on click
  const emailElement = document.querySelector(".contact i.fa-envelope");
  if (emailElement) {
    const parent = emailElement.closest("p");
    if (parent) {
      parent.style.cursor = "pointer";
      parent.addEventListener("click", () => {
        const emailText = "klod.space@gmail.com";
        navigator.clipboard.writeText(emailText);
        showTooltip(parent, "Copied!");
      });
    }
  }

  // Tooltip for copy
  function showTooltip(target, text) {
    const tooltip = document.createElement("span");
    tooltip.textContent = text;
    tooltip.style.position = "absolute";
    tooltip.style.background = "rgba(0,0,0,0.75)";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "4px 8px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "12px";
    tooltip.style.top =
      target.getBoundingClientRect().top + window.scrollY - 30 + "px";
    tooltip.style.left = target.getBoundingClientRect().left + 10 + "px";
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.3s ease";
    document.body.appendChild(tooltip);

    requestAnimationFrame(() => (tooltip.style.opacity = "1"));
    setTimeout(() => {
      tooltip.style.opacity = "0";
      setTimeout(() => tooltip.remove(), 300);
    }, 1000);
  }
});
