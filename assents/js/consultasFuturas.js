document.addEventListener('DOMContentLoaded', () => {
  const caixaConsultas = document.querySelector('.caixa-consultas');

  // Responsividade: ajusta layout em telas pequenas
  function ajustarLayout() {
    if (window.innerWidth < 600) {
      caixaConsultas.style.padding = '10px';
    } else {
      caixaConsultas.style.padding = '40px';
    }
  }
  window.addEventListener('resize', ajustarLayout);
  ajustarLayout();

  // Buscar consultas futuras na API
  fetch('https://api.exemplo.com/consultasFuturas') // Troque pela URL real da sua API
    .then(res => res.json())
    .then(consultas => {
      // Remove cards fixos do HTML
      document.querySelectorAll('.card-consulta').forEach(card => card.remove());

      if (!consultas.length) {
        const msg = document.createElement('div');
        msg.className = 'card-consulta';
        msg.innerHTML = '<p class="tipo-consulta">Nenhuma consulta agendada.</p>';
        caixaConsultas.appendChild(msg);
        return;
      }

      consultas.forEach(consulta => {
        const card = document.createElement('div');
        card.className = 'card-consulta';
        card.innerHTML = `
          <p class="tipo-consulta">${consulta.tipo}</p>
          <p><strong>Dia:</strong> ${consulta.data}</p>
          <p><strong>Horário:</strong> ${consulta.horario}</p>
          <p><strong>Médico:</strong> ${consulta.medico}</p>
        `;
        caixaConsultas.appendChild(card);
      });
    })
    .catch(() => {
      const erro = document.createElement('div');
      erro.className = 'card-consulta';
      erro.innerHTML = '<p style="color:red;">Erro ao carregar consultas.</p>';
      caixaConsultas.appendChild(erro);
    });
});