/* PureSpace demo website interactions. Update the business details below before launch. */
const SITE_CONFIG = {
  // Replace with the real business email address before publishing.
  contactEmail: "hello@purespace.example",
  // Enter country code + number only, with no +, spaces or punctuation (example: 919876543210).
  // Leave blank until the real business WhatsApp number is available.
  whatsappNumber: ""
};

(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Keep the copyright year current.
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // Prefill the contact form when a visitor clicks a service-specific enquiry link.
  const serviceSelect = document.querySelector("#service");
  if (serviceSelect) {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService) {
      const matchingOption = Array.from(serviceSelect.options).find((option) =>
        option.text.trim().toLowerCase() === requestedService.trim().toLowerCase()
      );
      if (matchingOption) serviceSelect.value = matchingOption.value;
    }
  }

  // The form opens a pre-addressed email draft. It never pretends to submit to a server.
  const quoteForm = document.querySelector("[data-quote-form]");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = document.querySelector("[data-form-status]");
      if (!quoteForm.reportValidity()) return;

      const formData = new FormData(quoteForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "Not provided").trim();
      const service = String(formData.get("service") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const subject = encodeURIComponent(`Cleaning enquiry: ${service}`);
      const body = encodeURIComponent(
        `Hello PureSpace,\n\nI'd like to request a cleaning quote.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nAbout my space:\n${message}\n\nPlease contact me to discuss the next steps.\n`
      );

      if (status) {
        status.textContent = "Your email application should open with the enquiry details. Review the message and send it from there.";
      }
      window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    });
  }

  // WhatsApp links stay safely inactive until a real business number is configured.
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    if (SITE_CONFIG.whatsappNumber && /^\d{8,15}$/.test(SITE_CONFIG.whatsappNumber)) {
      const message = encodeURIComponent("Hello PureSpace, I'd like to enquire about your cleaning services.");
      link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.addEventListener("click", (event) => {
        if (!SITE_CONFIG.whatsappNumber) event.preventDefault();
      });
    } else {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.alert("This is a demo website. Add the real business WhatsApp number in assets/js/main.js before publishing.");
      });
    }
  });

  // Subtle reveal motion, with a no-motion fallback for accessibility and older browsers.
  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
