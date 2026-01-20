const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("[data-nav]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));

    // simple dropdown behavior
    nav.style.display = open ? "none" : "flex";
    nav.style.position = "absolute";
    nav.style.top = "72px";
    nav.style.left = "24px";
    nav.style.right = "24px";
    nav.style.flexDirection = "column";
    nav.style.gap = "10px";
    nav.style.padding = "14px";
    nav.style.background = "rgba(255,255,255,.95)";
    nav.style.border = "1px solid rgba(11,18,32,.12)";
    nav.style.borderRadius = "14px";
    nav.style.backdropFilter = "blur(10px)";
  });
}
