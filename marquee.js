document.addEventListener("DOMContentLoaded", function () {
  const marquee = document.querySelector(".certifications-marquee");
  if (!marquee) return;

  const track = marquee.querySelector(".marquee-track");
  const group = track ? track.querySelector(".marquee-group") : null;
  if (!track || !group) return;

  const setupMarquee = () => {
    // Reset to a single group before cloning.
    track.innerHTML = "";
    track.appendChild(group);

    const trackStyles = getComputedStyle(track);
    const gap =
      parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
    const groupWidth = group.getBoundingClientRect().width;
    const stepWidth = groupWidth + gap;

    let totalWidth = groupWidth;
    while (totalWidth < marquee.offsetWidth + stepWidth) {
      const clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
      totalWidth += stepWidth;
    }

    requestAnimationFrame(() => {
      const first = track.children[0];
      const second = track.children[1];
      if (first && second) {
        const distance =
          second.getBoundingClientRect().left -
          first.getBoundingClientRect().left;
        track.style.setProperty("--marquee-distance", `-${distance}px`);
      }
      track.classList.add("is-ready");
    });
  };

  if (document.readyState === "complete") {
    setupMarquee();
  } else {
    window.addEventListener("load", setupMarquee, { once: true });
  }
});
