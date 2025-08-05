document.addEventListener('DOMContentLoaded', () => {
  const selectPaciente = document.getElementById('selectPaciente');
  const historicoContainer = document.getElementById('historicoContainer');

  
  fetch('https://api.exemplo.com/pacientes') 
    .then(res => res.json())
    .then(pacientes => {
      pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nome;
        selectPaciente.appendChild(option);
      });
    })
    .catch(() => {
      selectPaciente.innerHTML = '<option>Erro ao carregar pacientes</option>';
    });

  
  selectPaciente.addEventListener('change', () => {
    historicoContainer.innerHTML = '';
    const pacienteId = selectPaciente.value;
    if (!pacienteId) return;

    fetch(`https://api.exemplo.com/historico/${pacienteId}`)    
      .then(res => res.json())
      .then(historicos => {
        if (historicos.length === 0) {
          historicoContainer.innerHTML = '<div class="message">Nenhum histórico encontrado.</div>';
          return;
        }
        historicos.forEach(item => {
          const div = document.createElement('div');
          div.className = 'historico-item';
          div.innerHTML = `
            <div class="historico-data">${item.data} - ${item.especialidade}</div>
            <p><strong>Procedimento:</strong> ${item.procedimento}</p>
            <p><strong>Diagnóstico:</strong> ${item.diagnostico}</p>
            <p><strong>Prescrição:</strong> ${item.prescricao}</p>
          `;
          historicoContainer.appendChild(div);
        });
      })
      .catch(() => {
        historicoContainer.innerHTML = '<div class="message" style="color:red;">Erro ao carregar histórico.</div>';
      });
  });
});