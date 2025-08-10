'use strict';


const API_URL = 'http://localhost:8080/api/agendaconsulta';


const radios = document.querySelectorAll('input[name="tipo"]');
const campoConvenio = document.getElementById('campo-convenio');
const btnAgendar = document.querySelector('.btn-agendar');
const tabela = document.getElementById('tabela-agendamentos').querySelector('tbody');
const selectConvenio = document.getElementById('select-convenio');
const selectEspecialidade = document.getElementById('especialidade');
const inputData = document.getElementById('data-consulta');
const inputHora = document.getElementById('hora-consulta');
const selectMedico = document.getElementById('medicos-disponiveis');

let agendamentos = [];
let indexEditando = null;


radios.forEach(radio => {
  radio.addEventListener('change', () => {
    campoConvenio.style.display = radio.value === 'Convênio' ? 'block' : 'none';
  });
});


async function fetchAgendamentos() {
  try {
    const res = await fetch(API_URL);
    agendamentos = await res.json();
    renderTabela();
  } catch (e) {
    alert('Erro ao buscar agendamentos na API');
  }
}


async function criarAgendamento(agendamento) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agendamento)
    });
    return await res.json();
  } catch (e) {
    alert('Erro ao cadastrar agendamento na API');
  }
}

async function atualizarAgendamento(id, agendamento) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agendamento)
    });
    return await res.json();
  } catch (e) {
    alert('Erro ao atualizar agendamento na API');
  }
}

async function deletarAgendamento(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch (e) {
    alert('Erro ao excluir agendamento na API');
  }
}

function renderTabela() {
  tabela.innerHTML = '';
  if (!agendamentos || agendamentos.length === 0) {
    const linha = document.createElement('tr');
    linha.innerHTML = `<td colspan="7" style="text-align:center;">Nenhum agendamento encontrado.</td>`;
    tabela.appendChild(linha);
    return;
  }
  agendamentos.forEach((agendamento, idx) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${agendamento.tipo}</td>
      <td>${agendamento.convenio || '-'}</td>
      <td>${agendamento.especialidade}</td>
      <td>${agendamento.data}</td>
      <td>${agendamento.hora}</td>
      <td>${agendamento.medico}</td>
      <td>
        <button type="button" onclick="editarAgendamento('${agendamento.id || idx}')">Editar</button>
        <button type="button" onclick="excluirAgendamento('${agendamento.id || idx}')">Excluir</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}


btnAgendar.addEventListener('click', async () => {
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  const convenio = selectConvenio.value || '-';
  const especialidade = selectEspecialidade.value;
  const data = inputData.value;
  const hora = inputHora.value;
  const medico = selectMedico.value;

  if (!tipo || !especialidade || !data || !hora || !medico) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  const agendamento = {
    tipo,
    convenio: tipo === 'Convênio' ? convenio : '-',
    especialidade,
    data,
    hora,
    medico
  };

  if (indexEditando === null) {
    await criarAgendamento(agendamento);
    alert('Agendamento cadastrado com sucesso!');
  } else {

    await atualizarAgendamento(indexEditando, agendamento);
    alert('Agendamento atualizado com sucesso!');
  }

  limparFormulario();
  fetchAgendamentos();
});


window.editarAgendamento = function(id) {
  // Busca o agendamento pelo id
  const agendamento = agendamentos.find(a => String(a.id) === String(id));
  if (!agendamento) return;

  document.querySelectorAll('input[name="tipo"]').forEach(r => {
    r.checked = r.value === agendamento.tipo;
  });
  campoConvenio.style.display = agendamento.tipo === 'Convênio' ? 'block' : 'none';
  selectConvenio.value = agendamento.convenio !== '-' ? agendamento.convenio : '';
  selectEspecialidade.value = agendamento.especialidade;
  inputData.value = agendamento.data;
  inputHora.value = agendamento.hora;
  selectMedico.value = agendamento.medico;
  btnAgendar.textContent = 'Salvar Alterações';
  indexEditando = agendamento.id;
};

window.excluirAgendamento = async function(id) {
  if (confirm('Tem certeza que deseja excluir este agendamento?')) {
    await deletarAgendamento(id); 
    limparFormulario();
    fetchAgendamentos();
  }
};


function limparFormulario() {
  document.querySelectorAll('input[name="tipo"]').forEach(r => r.checked = false);
  campoConvenio.style.display = 'none';
  selectConvenio.value = '';
  selectEspecialidade.value = '';
  inputData.value = '';
  inputHora.value = '';
  selectMedico.value = '';
  btnAgendar.textContent = 'Agendar';
  indexEditando = null;
}


fetchAgendamentos();