// Toggle do tema dark/light
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    themeToggle.setAttribute('data-tooltip', 'Tema claro');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    themeToggle.setAttribute('data-tooltip', 'Tema escuro');
  }
});

// Toggle da busca
const searchToggle = document.querySelector('.search-toggle');
const searchContainer = document.querySelector('.search-container');
searchToggle.addEventListener('click', () => {
  searchContainer.classList.toggle('active');
});

// Fechar busca ao clicar fora
document.addEventListener('click', (e) => {
  if (!searchToggle.contains(e.target) && !searchContainer.contains(e.target)) {
    searchContainer.classList.remove('active');
  }
});

// Timeout de sessão (30 minutos)
let timeout;
const resetTimeout = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    alert('Sua sessão expirará em 1 minuto por inatividade');
    setTimeout(() => {
      window.location.href = 'logout.html';
    }, 60000);
  }, 1740000); // 29 minutos (1740000ms)
};

// Iniciar timeout quando a página carregar
window.addEventListener('load', () => {
  resetTimeout();
  
  // Resetar timeout em qualquer interação do usuário
  document.addEventListener('mousemove', resetTimeout);
  document.addEventListener('keypress', resetTimeout);
  document.addEventListener('click', resetTimeout);
});