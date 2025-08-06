'use strict';

// URL da sua API
const API_URL = 'http://localhost:8080/api/cadastroconvenio';

// Seletores dos elementos
const form = document.getElementById('formConvenio');
const mensagem = document.getElementById('mensagem');
const tabela = document.getElementById('tabela-convenios').querySelector('tbody');
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
  tabela.innerHTML = '';
  if (!convenios || convenios.length === 0) {
    tabela.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum convênio cadastrado.</td></tr>`;
    return;
  }
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
    tabela.appendChild(tr);
  });
}

// ------------------- CREATE e UPDATE -----------------------
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const convenio = form.convenio.value;
  const plano = form.plano.value;
  const carteirinha = form.carteirinha.value.trim();
  const validade = form.validade.value;

  if (!convenio || !plano || !carteirinha || !validade) {
    mensagem.textContent = "Preencha todos os campos!";
    mensagem.style.color = "red";
    return;
  }

  const novoConvenio = { convenio, plano, carteirinha, validade };

  if (editId === null) {
    // CREATE
    await criarConvenio(novoConvenio);
    mensagem.textContent = "Convênio cadastrado com sucesso!";
  } else {
    // UPDATE
    await atualizarConvenio(editId, novoConvenio);
    mensagem.textContent = "Convênio alterado com sucesso!";
  }
  mensagem.style.color = "green";
  form.reset();
  editId = null;
  form.querySelector('button[type="submit"]').textContent = 'Cadastrar Convênio';
  fetchConvenios();
  setTimeout(() => mensagem.textContent = '', 2000);
});

// ------------------- EDITAR e DELETE -----------------------
window.editarConvenio = function(id) {
  // Busca o convênio pelo id
  const conv = convenios.find(c => String(c.id) === String(id));
  if (!conv) return;
  form.convenio.value = conv.convenio;
  form.plano.value = conv.plano;
  form.carteirinha.value = conv.carteirinha;
  form.validade.value = conv.validade;
  editId = conv.id;
  form.querySelector('button[type="submit"]').textContent = 'Salvar Alterações';
};

window.excluirConvenio = async function(id) {
  if (confirm('Deseja excluir este convênio?')) {
    await deletarConvenio(id); // DELETE
    form.reset();
    editId = null;
    mensagem.textContent = "Convênio excluído!";
    mensagem.style.color = "green";
    fetchConvenios();
    setTimeout(() => mensagem.textContent = '', 2000);
    form.querySelector('button[type="submit"]').textContent = 'Cadastrar Convênio';
  }
};

// Inicializa a tabela ao carregar a página
fetchConvenios();