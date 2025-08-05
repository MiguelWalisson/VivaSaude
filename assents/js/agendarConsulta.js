'use strict';

lucide.createIcons();

const radios = document.querySelectorAll('input[name="tipo"]');
const campoConvenio = document.getElementById('campo-convenio');
const selectConvenio = document.getElementById('select-convenio');
const form = document.getElementById('form-agendamento');
const tabela = document.getElementById('lista-agendamentos');

let agendamentos = [];
let editIndex = -1;

// Exibe ou oculta o campo convênio
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    campoConvenio.style.display = radio.value === 'convenio' ? 'block' : 'none';
  });
});

// Apenas um fetch simulado para exemplo
function carregarDados() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => console.log('Dados carregados da API:', data))
    .catch(err => console.error('Erro ao carregar dados:', err));
}

// Renderiza a tabela
function renderTabela() {
  tabela.innerHTML = '';
  agendamentos.forEach((agendamento, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${agendamento.tipo}</td>
      <td>${agendamento.convenio || '-'}</td>
      <td>${agendamento.especialidade}</td>
      <td>${agendamento.data}</td>
      <td>${agendamento.hora}</td>
      <td>${agendamento.medico}</td>
      <td>
        <button class="btn-editar" onclick="editarAgendamento(${index})">Editar</button>
        <button class="btn-excluir" onclick="deletarAgendamento(${index})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// Reseta o formulário
function resetForm() {
  form.reset();
  campoConvenio.style.display = 'none';
  editIndex = -1;
  form.querySelector('button[type="submit"]').textContent = 'Agendar';
}

// Envio do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  const convenio = tipo === 'convenio' ? selectConvenio.value : null;
  const especialidade = document.getElementById('especialidade').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const medico = document.getElementById('medico').value;

  if (!especialidade || !data || !hora || !medico || (tipo === 'convenio' && !convenio)) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const novoAgendamento = { tipo, convenio, especialidade, data, hora, medico };

  if (editIndex === -1) {
    agendamentos.push(novoAgendamento);
  } else {
    agendamentos[editIndex] = novoAgendamento;
  }

  renderTabela();
  resetForm();
});

// Editar
window.editarAgendamento = function(index) {
  const agendamento = agendamentos[index];
  document.querySelector(`input[name="tipo"][value="${agendamento.tipo}"]`).checked = true;
  campoConvenio.style.display = agendamento.tipo === 'convenio' ? 'block' : 'none';
  selectConvenio.value = agendamento.convenio || '';
  document.getElementById('especialidade').value = agendamento.especialidade;
  document.getElementById('data').value = agendamento.data;
  document.getElementById('hora').value = agendamento.hora;
  document.getElementById('medico').value = agendamento.medico;

  editIndex = index;
  form.querySelector('button[type="submit"]').textContent = 'Salvar';
};

// Excluir
window.deletarAgendamento = function(index) {
  if (confirm('Deseja realmente excluir este agendamento?')) {
    agendamentos.splice(index, 1);
    renderTabela();
    resetForm();
  }
};

// Início
document.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  renderTabela();
});
