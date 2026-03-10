(() => {
  const toggle = document.querySelector(".nav__toggle");
  const list = document.getElementById("nav-list");

  if (!toggle || !list) return;

  const DESKTOP_BREAKPOINT = 900;
  const openClass = "is-open";

  const isDesktop = () => window.innerWidth > DESKTOP_BREAKPOINT;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    list.setAttribute("aria-hidden", String(!open));
    list.classList.toggle(openClass, open);
    document.documentElement.classList.toggle("nav-open", open);
  };

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
  const toggleOpen = () => setOpen(!isOpen());

  // Safe initial state
  if (isDesktop()) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    list.setAttribute("aria-hidden", "false");
    list.classList.remove(openClass);
    document.documentElement.classList.remove("nav-open");
  } else {
    setOpen(false);
  }

  // Toggle menu
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleOpen();
  });

  // Close when a nav link is clicked
  list.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (!isDesktop()) setOpen(false);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (isDesktop()) return;
    if (!isOpen()) return;
    if (e.target.closest(".nav")) return;
    setOpen(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state on resize
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      list.setAttribute("aria-hidden", "false");
      list.classList.remove(openClass);
      document.documentElement.classList.remove("nav-open");
    } else if (!isOpen()) {
      list.setAttribute("aria-hidden", "true");
    }
  });
})();

// ===== Carousel (Testimonials) =====
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel__track");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");

  if (!track) return;

  const scrollByAmount = (direction) => {
    track.scrollBy({
      left: direction * track.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  prev?.addEventListener("click", () => scrollByAmount(-1));
  next?.addEventListener("click", () => scrollByAmount(1));

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") scrollByAmount(-1);
    if (e.key === "ArrowRight") scrollByAmount(1);
  });
});
