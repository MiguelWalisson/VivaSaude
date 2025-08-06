'use strict';

// URL da sua API
const API_URL = 'http://localhost:8080/api/cadastroconvenio';

// Seletores dos elementos
const tabela = document.getElementById('tabela-convenios');
const tbody = tabela.querySelector('tbody');
const semConvenio = document.getElementById('sem-convenio');
const mensagem = document.getElementById('mensagem');

let convenios = [];
let editId = null;

// ------------------- READ (Buscar todos) -------------------
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

// ------------------- CREATE (Cadastrar) --------------------
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

// ------------------- UPDATE (Atualizar) --------------------
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

// ------------------- DELETE (Excluir) ----------------------
async function deletarConvenio(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch (e) {
    mensagem.textContent = 'Erro ao excluir convênio na API';
    mensagem.style.color = 'red';
  }
}

// Renderiza a tabela de convênios
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

// ------------------- CREATE e UPDATE -----------------------
// Exemplo de uso: chame criarConvenio({convenio, plano, carteirinha, validade}) para criar
// e atualizarConvenio(id, {convenio, plano, carteirinha, validade}) para atualizar

// ------------------- EDITAR e DELETE -----------------------
window.editarConvenio = function(id) {
  // Busca o convênio pelo id
  const conv = convenios.find(c => String(c.id) === String(id));
  if (!conv) return;
  // Aqui você pode abrir um modal ou preencher um formulário para edição
  // Exemplo: preencher campos de um formulário de edição
  // form.convenio.value = conv.convenio;
  // form.plano.value = conv.plano;
  // form.carteirinha.value = conv.carteirinha;
  // form.validade.value = conv.validade;
  // editId = conv.id;
  alert('Função de edição: implemente o formulário de edição conforme necessário.');
};

window.excluirConvenio = async function(id) {
  if (confirm('Deseja excluir este convênio?')) {
    await deletarConvenio(id); // DELETE
    mensagem.textContent = "Convênio excluído!";
    mensagem.style.color = "green";
    fetchConvenios();
    setTimeout(() => mensagem.textContent = '', 2000);
  }
};

// Inicializa a tabela ao carregar a página
fetchConvenios();