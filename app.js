document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav .nav-link");
  if (navToggle && navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.checked = false;
      });
    });
  }
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".navigation");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  if (menuButton && navigation) {
    const setNavState = () => {
      navigation.classList.toggle("is-open", menuButton.checked);
      if (hamburgerIcon) {
        hamburgerIcon.classList.toggle("is-open", menuButton.checked);
      }
      menuButton.setAttribute(
        "aria-expanded",
        menuButton.checked ? "true" : "false"
      );
    };
    menuButton.addEventListener("change", setNavState);
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.checked = false;
        setNavState();
      });
    });
    setNavState();
  }
  // Custom validation copy (Romanian) for form fields
  const requiredFields = document.querySelectorAll(
    ".form-input[required], .form-textarea[required]"
  );

  requiredFields.forEach((field) => {
    const messages = {
      required:
        field.dataset.requiredMessage || "Te rugăm să completezi acest câmp.",
      email:
        field.dataset.emailMessage || "Te rugăm să introduci un email valid.",
      pattern:
        field.dataset.patternMessage ||
        "Te rugăm să completezi acest câmp în formatul corect.",
      generic:
        field.dataset.invalidMessage || "Te rugăm să verifici datele introduse.",
    };

    field.addEventListener("invalid", (event) => {
      const f = event.target;
      if (f.validity.valueMissing) {
        f.setCustomValidity(messages.required);
      } else if (f.validity.typeMismatch && f.type === "email") {
        f.setCustomValidity(messages.email);
      } else if (f.validity.patternMismatch) {
        f.setCustomValidity(messages.pattern);
      } else {
        f.setCustomValidity(messages.generic);
      }
    });

    ["input", "change", "blur"].forEach((evt) => {
      field.addEventListener(evt, (event) => {
        event.target.setCustomValidity("");
      });
    });
  });

  const navbar = document.querySelector(".navbar");
  const heroSection = document.querySelector(".hero-section");

  if (navbar) {
    const getScrollTop = () =>
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    const syncNavbarScrollState = () => {
      const threshold = heroSection
        ? heroSection.offsetTop + heroSection.offsetHeight / 2
        : 10;
      const isScrolled = getScrollTop() >= threshold;
      navbar.classList.toggle("scrolled", isScrolled);
      navbar.style.background = isScrolled ? "var(--blue-dark-gradient)" : "";
      navbar.style.borderBottomColor = isScrolled
        ? "rgba(255,255,255,0.24)"
        : "";
    };

    syncNavbarScrollState();
    window.addEventListener("scroll", syncNavbarScrollState, { passive: true });
    document.addEventListener("scroll", syncNavbarScrollState, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", syncNavbarScrollState);
    window.addEventListener("load", syncNavbarScrollState, { once: true });
  }
});

   
