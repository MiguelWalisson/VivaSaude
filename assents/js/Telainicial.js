document.addEventListener('DOMContentLoaded', () => {
  // Carrossel automático dos serviços
  const carousel = document.getElementById('carousel');
  const totalItems = carousel.children.length;
  let currentIndex = 0;

  function moveSlide() {
    const visibleCount = Math.floor(carousel.parentElement.offsetWidth / 340);
    currentIndex = (currentIndex + 1) % (totalItems - visibleCount + 1);
    carousel.style.transform = `translateX(-${currentIndex * 340}px)`;
  }

  setInterval(moveSlide, 4000);

  // Esconder e mostrar o cabeçalho com scroll
  const topbar = document.querySelector('.topbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      topbar.classList.add('hidden');
    } else {
      topbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });

  // Mostrar topbar ao passar o mouse
  topbar.addEventListener('mouseenter', () => {
    topbar.classList.remove('hidden');
  });

  // Rolagem suave para seções do menu
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});