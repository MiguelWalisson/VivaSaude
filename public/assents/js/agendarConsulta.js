'use strict'

async function agendarConsulta(dadosConsulta) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    alert("Você precisa estar logado para agendar consulta");
    return;
  }

  try {
    const response = await fetch('/api/consultas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(dadosConsulta),
    });

    if (response.ok) {
      const consultaAgendada = await response.json();
      console.log('Consulta agendada:', consultaAgendada);
     
    } else {
      console.error('Erro ao agendar consulta:', response.status);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

async function carregarMedicosDisponiveis(especialidade, dataConsulta) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    alert("Você precisa estar logado");
    return;
  }

  const url = `/api/medicos/disponiveis?especialidade=${encodeURIComponent(especialidade)}&data=${encodeURIComponent(dataConsulta)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const medicos = await response.json();
      const selectMedicos = document.getElementById('selectMedicos');
      selectMedicos.innerHTML = ''; 

      medicos.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;      
        option.textContent = medico.nome; 
        selectMedicos.appendChild(option);
      });
    } else {
      console.error('Erro ao buscar médicos disponíveis', response.status);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}
document.getElementById('selectEspecialidade').addEventListener('change', () => {
  const especialidade = document.getElementById('selectEspecialidade').value;
  const dataConsulta = document.getElementById('inputDataConsulta').value;
  if (especialidade && dataConsulta) {
    carregarMedicosDisponiveis(especialidade, dataConsulta);
  }
});

document.getElementById('inputDataConsulta').addEventListener('change', () => {
  const especialidade = document.getElementById('selectEspecialidade').value;
  const dataConsulta = document.getElementById('inputDataConsulta').value;
  if (especialidade && dataConsulta) {
    carregarMedicosDisponiveis(especialidade, dataConsulta);
  }
});