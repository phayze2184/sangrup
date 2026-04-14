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
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const getScrollTop = () =>
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const syncNavbarScrollState = () => {
      navbar.classList.toggle("scrolled", getScrollTop() > 2);
    };

    window.addEventListener("scroll", syncNavbarScrollState, { passive: true });
    document.addEventListener("scroll", syncNavbarScrollState, {
      passive: true,
      capture: true,
    });
    window.addEventListener("load", syncNavbarScrollState, { passive: true });
    window.addEventListener("resize", syncNavbarScrollState, { passive: true });
    requestAnimationFrame(syncNavbarScrollState);
    syncNavbarScrollState();
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

  const feedbackPopup = document.querySelector("[data-feedback-popup]");
  const feedbackPopupTitle = feedbackPopup?.querySelector(
    ".feedback-popup__title"
  );
  const feedbackPopupMessage = feedbackPopup?.querySelector(
    ".feedback-popup__message"
  );
  const feedbackPopupCloseButtons = feedbackPopup?.querySelectorAll(
    "[data-feedback-popup-close]"
  );
  let previousFocusedElement = null;

  const hideFeedbackPopup = () => {
    if (!feedbackPopup) {
      return;
    }

    feedbackPopup.hidden = true;
    feedbackPopup.classList.remove("is-success", "is-error");
    feedbackPopup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-feedback-popup");

    if (previousFocusedElement instanceof HTMLElement) {
      previousFocusedElement.focus();
      previousFocusedElement = null;
    }
  };

  const showFeedbackPopup = (status, message) => {
    if (!feedbackPopup || !feedbackPopupTitle || !feedbackPopupMessage) {
      return;
    }

    previousFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    feedbackPopup.hidden = false;
    feedbackPopup.classList.remove("is-success", "is-error");
    feedbackPopup.classList.add(status === "success" ? "is-success" : "is-error");
    feedbackPopup.setAttribute("aria-hidden", "false");
    feedbackPopupTitle.textContent =
      status === "success" ? "Mesaj trimis" : "Trimitere eșuată";
    feedbackPopupMessage.textContent = message;
    document.body.classList.add("has-feedback-popup");

    const primaryCloseButton = feedbackPopup.querySelector(
      ".feedback-popup__action"
    );
    if (primaryCloseButton instanceof HTMLElement) {
      primaryCloseButton.focus();
    }
  };

  feedbackPopupCloseButtons?.forEach((button) => {
    button.addEventListener("click", () => {
      hideFeedbackPopup();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && feedbackPopup && !feedbackPopup.hidden) {
      hideFeedbackPopup();
    }
  });

  const contactForm = document.querySelector(".form-block");
  if (contactForm) {
    const formMessages = contactForm.querySelector(".form-messages");
    const successWrapper = contactForm.querySelector(".success");
    const errorWrapper = contactForm.querySelector(".error");
    const successText = contactForm.querySelector(".form-message--success");
    const errorText = contactForm.querySelector(".form-message--error");
    const submitButton = contactForm.querySelector("[data-contact-submit]");
    const submitEndpoint = contactForm.getAttribute("action") || "contact.php";
    const defaultSuccessMessage =
      successText?.textContent?.trim() ||
      "Mesajul a fost trimis cu succes. Revenim cât mai curând.";
    const defaultErrorMessage =
      errorText?.textContent?.trim() ||
      "A apărut o eroare la trimitere. Încearcă din nou sau scrie-ne la office@sangrup.ro.";

    const setFormStatus = (status, message) => {
      if (!formMessages || !successWrapper || !errorWrapper) {
        if (status) {
          showFeedbackPopup(
            status,
            message ||
              (status === "success"
                ? defaultSuccessMessage
                : defaultErrorMessage)
          );
        }
        return;
      }

      formMessages.hidden = true;
      successWrapper.hidden = true;
      errorWrapper.hidden = true;

      if (status === "success" && successText) {
        successText.textContent = message || defaultSuccessMessage;
      }

      if (status === "error" && errorText) {
        errorText.textContent = message || defaultErrorMessage;
      }

      if (status) {
        showFeedbackPopup(
          status,
          message ||
            (status === "success"
              ? defaultSuccessMessage
              : defaultErrorMessage)
        );
      }
    };

    setFormStatus(null);

    const handleContactSubmit = async () => {
      setFormStatus(null);

      if (!contactForm.reportValidity()) {
        return;
      }

      const scrollPosition = window.scrollY;

      if (submitButton) {
        submitButton.disabled = true;
      }
      contactForm.setAttribute("aria-busy", "true");

      try {
        const response = await fetch(submitEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: new FormData(contactForm),
        });

        const responseText = await response.text();
        let result = null;

        try {
          result = responseText ? JSON.parse(responseText) : null;
        } catch (parseError) {
          result = null;
        }

        const invalidPhpResponseMessage =
          "Serverul nu a returnat un răspuns valid. Verifică dacă `contact.php` rulează pe hosting cu PHP, nu prin Live Server.";

        if (!response.ok || !result?.ok) {
          throw new Error(
            result?.message ||
              (responseText.trim() ? invalidPhpResponseMessage : defaultErrorMessage)
          );
        }

        contactForm.reset();
        setFormStatus("success", result.message || defaultSuccessMessage);
      } catch (error) {
        const message =
          error instanceof TypeError
            ? "Nu s-a putut contacta serverul formularului. Dacă testezi local, folosește hosting cu PHP sau cPanel, nu Live Server."
            : error instanceof Error && error.message
              ? error.message
              : defaultErrorMessage;

        setFormStatus(
          "error",
          message
        );
      } finally {
        window.scrollTo({ top: scrollPosition });
        contactForm.removeAttribute("aria-busy");
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    };

    if (submitButton) {
      submitButton.addEventListener("click", () => {
        handleContactSubmit();
      });
    }

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleContactSubmit();
    });
  }

});

   
