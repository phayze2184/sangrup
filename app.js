const revealTargets = document.querySelectorAll(
  ".hero-eyebrow, .hero-title, .hero-text, .cta-hero"
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
