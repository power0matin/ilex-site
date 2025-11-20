document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile nav
  const navToggle = document.querySelector(".ilex-nav-toggle");
  const navLinks = document.querySelector(".ilex-nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("is-open");
        navToggle.classList.remove("is-open");
      }
    });
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Scroll animations using IntersectionObserver
  const animatedElements = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all
    animatedElements.forEach((el) => el.classList.add("is-visible"));
  }

  // Simple fake form handling: prevent submit & show console log
  const contactForm = document.querySelector(".ilex-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Contact form submitted");
      alert("Thank you. We will get back to you shortly.");
    });
  }
});
