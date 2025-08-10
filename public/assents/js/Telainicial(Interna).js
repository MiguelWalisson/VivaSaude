document.addEventListener('DOMContentLoaded', function() {
    const userInfo = document.querySelector('.user-info strong');
    
    const loggedUser = localStorage.getItem('loggedUser') || 'Funcionário';
    userInfo.textContent = loggedUser;

    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });

        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const cardTitle = this.querySelector('p').textContent;
                console.log(`Acessando: ${cardTitle}`);
                
                trackAccess(cardTitle);
            }
        });
    });

    function updateDateTime() {
        const now = new Date();
        const dateTimeStr = now.toLocaleString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const logo = document.querySelector('.logo');
        if (!document.getElementById('datetime')) {
            const datetimeEl = document.createElement('div');
            datetimeEl.id = 'datetime';
            datetimeEl.style.color = 'white';
            datetimeEl.style.fontSize = '0.9rem';
            datetimeEl.style.marginTop = '5px';
            logo.appendChild(datetimeEl);
        }
        
        document.getElementById('datetime').textContent = dateTimeStr;
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);

    function trackAccess(section) {
        console.log(`Registrando acesso à seção: ${section}`);
        
        const accessHistory = JSON.parse(localStorage.getItem('accessHistory') || '[]');
        accessHistory.push({
            section,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('accessHistory', JSON.stringify(accessHistory));
    }

    function checkSession() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            alert('Sessão expirada. Por favor, faça login novamente.');
            window.location.href = 'login.html';
        }
    }

    checkSession();
    setInterval(checkSession, 300000);

    function addLogoutButton() {
        const userInfoDiv = document.querySelector('.user-info');
        
        const logoutBtn = document.createElement('button');
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sair';
        logoutBtn.style.background = 'transparent';
        logoutBtn.style.border = 'none';
        logoutBtn.style.color = 'white';
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.style.marginLeft = '15px';
        logoutBtn.style.fontWeight = '500';
        
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedUser');
            window.location.href = 'login.html';
        });
        
        userInfoDiv.appendChild(logoutBtn);
    }

    addLogoutButton();

    function loadNotifications() {
        setTimeout(() => {
            const notifications = [
                { id: 1, message: '5 novas consultas agendadas para hoje', priority: 'high' },
                { id: 2, message: '2 exames pendentes de liberação', priority: 'medium' }
            ];
            
            if (notifications.length > 0) {
                showNotificationBadge(notifications.length);
            }
        }, 1500);
    }

    function showNotificationBadge(count) {
        const userIcon = document.querySelector('.user-info i');
        
        const badge = document.createElement('span');
        badge.textContent = count;
        badge.style.position = 'absolute';
        badge.style.top = '-5px';
        badge.style.right = '-5px';
        badge.style.background = '#ff4757';
        badge.style.color = 'white';
        badge.style.borderRadius = '50%';
        badge.style.width = '18px';
        badge.style.height = '18px';
        badge.style.fontSize = '0.7rem';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        
        userIcon.style.position = 'relative';
        userIcon.appendChild(badge);
        
        userIcon.addEventListener('click', function() {
            showNotificationsPopup();
        });
    }

    function showNotificationsPopup() {
        console.log('Mostrando notificações...');
    }

    loadNotifications();
});