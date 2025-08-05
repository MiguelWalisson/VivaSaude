'use strict';

const form = document.getElementById('medicoForm');
const mensagem = document.getElementById('mensagem');
const tabelaCorpo = document.querySelector('#tabela-medicos tbody');

let idEdicao = null; // usado para saber se é edição ou novo cadastro

// Exibe mensagem no formulário
function exibirMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? 'red' : 'green';
  setTimeout(() => mensagem.textContent = '', 3000);
}

// Limpa o formulário
function limparFormulario() {
  form.reset();
  idEdicao = null;
}

// Preenche formulário para editar
function preencherFormulario(medico) {
  form.nome.value = medico.nome;
  form.crm.value = medico.crm;
  form.especialidade.value = medico.especialidade;
  form.email.value = medico.email;
  form.telefone.value = medico.telefone;
  form.senha.value = medico.senha;
  idEdicao = medico.id;
}

// Cadastrar ou atualizar médico
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const medico = {
    nome: form.nome.value,
    crm: form.crm.value,
    especialidade: form.especialidade.value,
    email: form.email.value,
    telefone: form.telefone.value,
    senha: form.senha.value
  };

  const url = idEdicao
    ? `http://localhost:8080/api/medicos/${idEdicao}`
    : 'http://localhost:8080/api/medicos';

  const metodo = idEdicao ? 'PUT' : 'POST';

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medico)
    });

    if (!resposta.ok) throw new Error();

    exibirMensagem(idEdicao ? 'Médico atualizado!' : 'Médico cadastrado!');
    limparFormulario();
    listarMedicos();
  } catch (error) {
    exibirMensagem('Erro ao salvar médico.', true);
  }
});

// Listar médicos
async function listarMedicos() {
  try {
    const resposta = await fetch('http://localhost:8080/api/medicos');
    const medicos = await resposta.json();

    tabelaCorpo.innerHTML = '';

    medicos.forEach(medico => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${medico.nome}</td>
        <td>${medico.crm}</td>
        <td>${medico.especialidade}</td>
        <td>${medico.email}</td>
        <td>${medico.telefone}</td>
        <td class="actions">
          <button onclick="editarMedico(${medico.id})">Editar</button>
          <button onclick="excluirMedico(${medico.id})">Excluir</button>
        </td>
      `;
      tabelaCorpo.appendChild(linha);
    });
  } catch (error) {
    exibirMensagem('Erro ao carregar médicos.', true);
  }
}

// Buscar médico e preencher formulário
window.editarMedico = async function (id) {
  try {
    const resposta = await fetch(`http://localhost:8080/api/medicos/${id}`);
    const medico = await resposta.json();
    preencherFormulario(medico);
  } catch (error) {
    exibirMensagem('Erro ao carregar dados do médico.', true);
  }
};

// Excluir médico
window.excluirMedico = async function (id) {
  const confirmar = confirm('Deseja realmente excluir este médico?');
  if (!confirmar) return;

  try {
    const resposta = await fetch(`http://localhost:8080/api/medicos/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) throw new Error();

    exibirMensagem('Médico excluído com sucesso!');
    listarMedicos();
  } catch (error) {
    exibirMensagem('Erro ao excluir médico.', true);
  }
};

// Inicia listagem ao carregar
window.addEventListener('DOMContentLoaded', listarMedicos);
