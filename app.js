const revealTargets = document.querySelectorAll(
  ".hero-eyebrow, .hero-title, .hero-description"
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
  const track = document.querySelector(".services-track");
  if (!track) return;

  if (!window.jQuery || !jQuery.fn || !jQuery.fn.owlCarousel) {
    track.classList.add("no-owl");
    return;
  }

  const $slider = jQuery(track);
  $slider.owlCarousel({
    loop: true,
    margin: 24,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1, nav: false, dots: true },
      600: { items: 2, nav: false, dots: true },
      1024: { items: 2, nav: false, dots: true },
    },
  });
});
