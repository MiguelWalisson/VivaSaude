'use strict'

const url = 'http://localhost:8080/pacientes';
let usuario = null;

async function fetchUsuario() {
  try {
  
     
    const res = await fetch(url + `/3`); 

    if(!res.ok) throw new Error('Erro na requisição' + res.status);
    usuario = await res.json();
    preencherFormulario(usuario);
    } catch (e) {
    console.log = ('Erro ao buscar usuario na API' + e);
    alert('Erro ao carregar dados do paciente!');
   
  }
}
function preencherFormulario(dados){
  document.getElementById('nome').value = dados.nome || '';
  document.getElementById('cpf').value = dados.cpf || '';
  document.getElementById('data').value = dados.dataNascimento || '';
  document.getElementById('genero').value = dados.genero || '';
  document.getElementById('telefone').value = dados.telefone || '';
  document.getElementById('cep').value = dados.cep || '';
  document.getElementById('endereco').value = dados.endereco || '';
  document.getElementById('email').value = dados.email || '';
}
async function atualizarUsuario(dados) {
  try{
    if(!usuario || !usuario.id){
      throw new Error('Usuário não está carregado ou ID inválido.');

    }
    const res = await fetch(`${url}/usuario/${usuario.id}`,{
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(dados),
    });
    if(!res.ok){
      throw new Error(`Erro ao atualizar: ${res.status}`);
    }
    const dataAtualizada = await res.json();
    return dataAtualizada;
  }catch(e){
    console.log("Erro ao atualizar informações na API: ", e);
    alert('Erro ao salvar informações!');
  }
    
}

const form = document.getElementById('formEditar');
const mensagem = document.getElementById('mensagem');

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
  const atualizado = await atualizarUsuario(dados);

  if(atualizado) {
    mensagem.textContent = 'Informações salvas com sucesso!';
    setTimeout(() => {
      mensagem.textContent = '';
    }, 2000);
  }
});
window.addEventListener('DOMContentLoaded',fetchUsuario);


 