'use strict'

const url = 'http://localhost:8080/pacientes';
async function fetchUsuario() {
  try {
  
    const res = await fetch(url + '/usuario'); 
    usuario = await res.json();
    preencherFormulario();
  } catch (e) {
    console.log = 'Erro ao buscar usuario na API' + e;
   
  }
}
console.log("Carregando dados do paciente...");
window.addEventListener('DOMContentLoaded',() => {  

fetch(url)
.then(res =>{
    if(!res.ok) throw new Error('Erro na requisição:');
    return res.json();
    })
    .then(data => {
        console.log("Dados carregados com sucesso!")
        document.getElementById('nome').value = data.nome;
        document.getElementById('cpf').value = data.cpf;
        document.getElementById('data').value = data.dataNascimento;
        document.getElementById('genero').value = data.genero;
        document.getElementById('telefone').value = data.telefone;
        document.getElementById('cep').value = data.cep;
        document.getElementById('endereco').value = data.endereco;
        document.getElementById('email').value = data.email;
    })
    .catch(err => {
        console.error('Erro ao carregar dados do paciente:', err);
        alert("Erro ao carregar dados do paciente!");
    });
});
async function atualizarUsuario(dados) {
  try {
    const res = await fetch(`${url}/usuario/${usuario.id || 1}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
      console: console.log = '....'
    });
    return await res.json();
    
  } catch (e) {
    console.log = 'Erro ao atualizar informações na API';
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
  console.log = "Informações salvas com sucesso!";
  setTimeout(() => {
    mensagem.textContent = "";
  }, 2000);
});