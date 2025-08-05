document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultaForm');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    
    const dadosConsulta = {
      paciente: document.getElementById('paciente').value,
      data: document.getElementById('data').value,
      horario: document.getElementById('horario').value,
      medico: document.getElementById('medico').value,
      especialidade: document.getElementById('especialidade').value,
      status: document.getElementById('status').value
    };

    
    fetch('https:/api/consultas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosConsulta)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao agendar consulta');
      }
      return response.json();
    })
    .then(data => {
      mensagem.textContent = "Consulta agendada com sucesso!";
      mensagem.style.color = "green";
      form.reset();
    })
    .catch(error => {
      mensagem.textContent = "Erro ao agendar consulta. Tente novamente.";
      mensagem.style.color = "red";
      console.error(error);
    });
  });
});