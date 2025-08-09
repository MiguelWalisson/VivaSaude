    document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.getElementById('login-form');
      
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
          alert('Por favor, preencha todos os campos');
          return;
        }
        
        window.location.href = 'Telainicial(Interno).html';
        
      });
    });
