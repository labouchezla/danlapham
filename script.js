// ===== Mobile nav toggle =====
const toggle = document.querySelector('.nav__toggle');
const navList = document.getElementById('nav-list');

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

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
