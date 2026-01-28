const revealTargets = document.querySelectorAll(
  ".hero-title, .hero-description, .despre-title, .despre-text, .services-title, .services-subtitle, .portfolio-title, .portfolio-subtitle, .certifications-title, .certifications-subtitle, .contact-title, .contact-subtitle, .contact-item, contact-details"
);

revealTargets.forEach((el) => el.classList.add("reveal-up"));

if (revealTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

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

  const track = document.querySelector(".services-track");
  if (!track) return;

  if (!window.jQuery || !jQuery.fn || !jQuery.fn.owlCarousel) {
    track.classList.add("no-owl");
    const cards = Array.from(track.querySelectorAll(".service-card"));
    if (cards.length > 1) {
      const dots = document.createElement("div");
      dots.className = "services-dots";
      dots.setAttribute("role", "tablist");

      cards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "services-dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Slide ${index + 1}`);
        dot.addEventListener("click", () => {
          const card = cards[index];
          track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        });
        dots.appendChild(dot);
      });

      track.insertAdjacentElement("afterend", dots);

      let rafId = 0;
      let autoTimer = 0;
      let autoIndex = 0;
      const updateActiveDot = () => {
        rafId = 0;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const trackStyles = getComputedStyle(track);
        const gap =
          parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
        const step = cardWidth + gap;
        const index = Math.round(track.scrollLeft / step);
        dots.querySelectorAll(".services-dot").forEach((dot, i) => {
          dot.classList.toggle("is-active", i === index);
        });
      };

      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      const mobileQuery = window.matchMedia("(max-width: 599px)");
      const startAutoAdvance = () => {
        if (autoTimer || reducedMotionQuery.matches || !mobileQuery.matches)
          return;
        autoTimer = window.setInterval(() => {
          autoIndex = (autoIndex + 1) % cards.length;
          const card = cards[autoIndex];
          track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        }, 4500);
      };
      const stopAutoAdvance = () => {
        if (!autoTimer) return;
        window.clearInterval(autoTimer);
        autoTimer = 0;
      };
      const updateAutoAdvance = () => {
        if (mobileQuery.matches && !reducedMotionQuery.matches) {
          startAutoAdvance();
        } else {
          stopAutoAdvance();
        }
      };

      updateActiveDot();
      track.addEventListener("scroll", () => {
        if (rafId) return;
        rafId = requestAnimationFrame(updateActiveDot);
      });

      track.addEventListener("mouseenter", stopAutoAdvance);
      track.addEventListener("touchstart", stopAutoAdvance, { passive: true });
      track.addEventListener("mouseleave", updateAutoAdvance);

      updateAutoAdvance();
      if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener("change", updateAutoAdvance);
      } else if (mobileQuery.addListener) {
        mobileQuery.addListener(updateAutoAdvance);
      }
      if (reducedMotionQuery.addEventListener) {
        reducedMotionQuery.addEventListener("change", updateAutoAdvance);
      } else if (reducedMotionQuery.addListener) {
        reducedMotionQuery.addListener(updateAutoAdvance);
      }
    }
    return;
  }

  const $slider = jQuery(track);
  $slider.owlCarousel({
    loop: true,
    margin: 24,
    nav: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 4500,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1, nav: false, dots: true },
      600: { items: 2, nav: false, dots: true },
      1024: { items: 2, nav: false, dots: true },
    },
  });

  const mobileQuery = window.matchMedia("(max-width: 599px)");
  const setAutoplay = (event) => {
    if (event.matches) {
      $slider.trigger("play.owl.autoplay", [4500]);
    } else {
      $slider.trigger("stop.owl.autoplay");
    }
  };
  setAutoplay(mobileQuery);
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", setAutoplay);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(setAutoplay);
  }
});
