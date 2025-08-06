'use strict';


const API_URL = 'http://localhost:8080/api/cadastroconvenio';


const tabela = document.getElementById('tabela-convenios');
const tbody = tabela.querySelector('tbody');
const semConvenio = document.getElementById('sem-convenio');
const mensagem = document.getElementById('mensagem');

let convenios = [];
let editId = null;

async function fetchConvenios() {
  try {
    const res = await fetch(API_URL);
    convenios = await res.json();
    renderTabela();
  } catch (e) {
    mensagem.textContent = 'Erro ao buscar convênios na API';
    mensagem.style.color = 'red';
    tabela.style.display = 'none';
    semConvenio.style.display = '';
  }
}


async function criarConvenio(convenio) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(convenio)
    });
    return await res.json();
  } catch (e) {
    mensagem.textContent = 'Erro ao cadastrar convênio na API';
    mensagem.style.color = 'red';
  }
}


async function atualizarConvenio(id, convenio) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(convenio)
    });
    return await res.json();
  } catch (e) {
    mensagem.textContent = 'Erro ao atualizar convênio na API';
    mensagem.style.color = 'red';
  }
}

async function deletarConvenio(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch (e) {
    mensagem.textContent = 'Erro ao excluir convênio na API';
    mensagem.style.color = 'red';
  }
}


function renderTabela() {
  tbody.innerHTML = '';
  if (!convenios || convenios.length === 0) {
    tabela.style.display = 'none';
    semConvenio.style.display = '';
    return;
  }
  tabela.style.display = '';
  semConvenio.style.display = 'none';
  convenios.forEach((conv, idx) => {
    const id = conv.id || idx;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${conv.convenio}</td>
      <td>${conv.plano}</td>
      <td>${conv.carteirinha}</td>
      <td>${conv.validade}</td>
      <td>
        <button type="button" onclick="editarConvenio('${id}')">Editar</button>
        <button type="button" onclick="excluirConvenio('${id}')">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


window.editarConvenio = function(id) {
  
  const conv = convenios.find(c => String(c.id) === String(id));
  if (!conv) return;

  alert('Função de edição: implemente o formulário de edição conforme necessário.');
};

window.excluirConvenio = async function(id) {
  if (confirm('Deseja excluir este convênio?')) {
    await deletarConvenio(id); 
    mensagem.textContent = "Convênio excluído!";
    mensagem.style.color = "green";
    fetchConvenios();
    setTimeout(() => mensagem.textContent = '', 2000);
  }
};

fetchConvenios();