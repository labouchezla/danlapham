(() => {
  const toggle = document.querySelector(".nav__toggle");
  const list = document.getElementById("nav-list");

  if (!toggle || !list) return;

  const openClass = "is-open";

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    list.classList.toggle(openClass, open);

    // Optional: prevent background scroll when menu is open
    document.documentElement.classList.toggle("nav-open", open);
  };

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
  const toggleOpen = () => setOpen(!isOpen());

  // ✅ Primary handler (reliable on iOS Safari)
  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // don't let it immediately trigger outside click logic
    toggleOpen();
  });

  // Close when a nav link is clicked
  list.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    setOpen(false);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;

    // If the click is inside the nav (button or list), ignore
    if (e.target.closest(".nav")) return;

    setOpen(false);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setOpen(false);
  });

  // If you resize to desktop, force it “closed” (avoids stuck states)
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 900px)").matches) setOpen(false);
  });
})();



// ===== Carousel (Testimonials) =====
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.carousel__track');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');

  const scrollBy = direction => {
    track.scrollBy({
      left: direction * track.clientWidth * 0.9,
      behavior: 'smooth'
    });
  };

  prev?.addEventListener('click', () => scrollBy(-1));
  next?.addEventListener('click', () => scrollBy(1));

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') scrollBy(-1);
    if (e.key === 'ArrowRight') scrollBy(1);
  });
});
