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

  const navbar = document.querySelector(".navbar");
  const heroSection = document.querySelector(".hero-section");

  const setNavbarScrolled = (isScrolled) => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", isScrolled);
  };

  if (navbar && heroSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroHeight = entry.boundingClientRect.height || 1;
        const visible = entry.intersectionRect.height / heroHeight;
        setNavbarScrolled(visible < 0.9);
      },
      { threshold: [0.9] }
    );
    observer.observe(heroSection);
  } else if (navbar) {
    const updateOnScroll = () => {
      const rect = heroSection ? heroSection.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const heroTop = rect.top + window.scrollY;
      const heroHeight = rect.height || window.innerHeight;
      const threshold = heroTop + heroHeight * 0.1;
      setNavbarScrolled(window.scrollY >= threshold);
    };
    updateOnScroll();
    window.addEventListener("scroll", updateOnScroll, { passive: true });
    window.addEventListener("resize", updateOnScroll);
    window.addEventListener("load", updateOnScroll);
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
});


   
