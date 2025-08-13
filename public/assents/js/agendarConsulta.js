'use strict';

document.addEventListener('DOMContentLoaded', () => {
  async function agendarConsulta(dadosConsulta) {
  const token = localStorage.getItem('acessToken');
  if (!token) {
    console.log("nenhum token encontrado!");
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
      document.getElementById('mensagem').textContent = "Consulta agendada com sucesso!";
      console.log('Consulta agendada:', consultaAgendada);
    } else {
      console.error('Erro ao agendar consulta:', response.status);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
  
}

async function carregarMedicosDisponiveis() {
  const token = localStorage.getItem('acessToken');
  if (!token) {
    console.log("nenhum token encontrado!");
    alert("Você precisa estar logado");
    return;
  }

  const url = `/api/medicos`;

  try {
    alert('aqui')
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const selectMedicos = document.getElementById('selectMedicos');
    selectMedicos.innerHTML = '';

    if (response.ok) {
      console.log('Buscando médicos disponíveis...');
      const medicos = await response.json();

      if (medicos.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Nenhum médico disponível';
        selectMedicos.appendChild(option);
        return;
      }

      medicos.forEach(medico => {
        console.log(medico);
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

carregarMedicosDisponiveis();

// Eventos para carregar médicos quando especialidade ou data mudarem
document.addEventListener('DOMContentLoaded', () => {
  const selectEspecialidade = document.getElementById('selectEspecialidade');
  const inputDataConsulta = document.getElementById('inputDataConsulta');

  selectEspecialidade.addEventListener('change', () => {
    if (selectEspecialidade.value && inputDataConsulta.value) {
      carregarMedicosDisponiveis(selectEspecialidade.value, inputDataConsulta.value);
    }
  });

  inputDataConsulta.addEventListener('change', () => {
    if (selectEspecialidade.value && inputDataConsulta.value) {
      carregarMedicosDisponiveis(selectEspecialidade.value, inputDataConsulta.value);
    }
  });


  document.getElementById('agendar').addEventListener('click', (e) => {
    
    alert('Botão Agendar clicado');
    console.log('Botão Agendar clicado');

    const dadosConsulta = {
      paciente: document.getElementById('paciente').value,
      data: document.getElementById('inputDataConsulta').value,
      horario: document.getElementById('horario').value,
      medico: document.getElementById('selectMedicos').value,
      especialidade: document.getElementById('selectEspecialidade').value,
      status: document.getElementById('status').value,
      
    
    };
    console.log('Dados da consulta:', dadosConsulta);
    salvarConsultaLocal(dadosConsulta);
  });
});

function salvarConsultaLocal(dadosConsulta) {
  const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
  consultas.push(dadosConsulta);
  localStorage.setItem('consultas', JSON.stringify(consultas));
  console.log('Dados da consulta salvos no localStorage:', dadosConsulta);
}
});
