'use strict';

// URL da sua API
const API_URL = 'http://localhost:8080/api/cadastroconvenio';

// Exemplo de campos do formulário
const form = document.getElementById('formEditar');
const mensagem = document.getElementById('mensagem');

let usuario = {};
let editId = null;

async function fetchUsuario() {
  try {
  
    const res = await fetch(API_URL + '/usuario'); 
    usuario = await res.json();
    preencherFormulario();
  } catch (e) {
    mensagem.textContent = 'Erro ao buscar informações na API';
    mensagem.style.color = 'red';
  }
}

function preencherFormulario() {
  for (const campo in usuario) {
    if (document.getElementById(campo)) {
      document.getElementById(campo).value = usuario[campo];
    }
  }
}


async function atualizarUsuario(dados) {
  try {
    const res = await fetch(`${API_URL}/usuario/${usuario.id || 1}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return await res.json();
  } catch (e) {
    mensagem.textContent = 'Erro ao atualizar informações na API';
    mensagem.style.color = 'red';
  }
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const dados = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    data: document.getElementById('data').value,
    genero: document.getElementById('genero').value,
    telefone: document.getElementById('telefone').value,
    cep: document.getElementById('cep').value,
    endereco: document.getElementById('endereco').value,
    email: document.getElementById('email').value
  };


  await atualizarUsuario(dados);
  mensagem.textContent = "Informações salvas com sucesso!";
  mensagem.style.color = "green";
  setTimeout(() => {
    mensagem.textContent = "";
  }, 2000);
});


fetchUsuario();