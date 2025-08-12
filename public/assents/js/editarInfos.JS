'use strict'


let usuario = null;
window.addEventListener('DOMContentLoaded',fetchUsuario);
async function fetchUsuario() {
  try {
    const token = localStorage.getItem('acessToken');
    
    if(!token){
      console.log("Nenhum token JWT encontrado!")
      return null;
    }
  
     
    const response = await fetch('/api/auth/me',{
      method:'GET',
           
            headers:{
                'Content-Type' : 'application/json',
                'Authorization':`Bearer ${token}`
                }

    }); 
    if(response.ok){
      console.log('Dados do paciente carregados com sucesso', response)
    }

    if(response.status === 400 || response.status === 403) {
      console.log('Token inválido ou não autorizado!')
      return null;
    }
    if(!response.ok){
      console.log("Erro ao buscar usuario!")
      return null;
    }
    usuario = await response.json();
    preencherFormulario(usuario);
    } catch (err) {
    console.log = ('Erro ao buscar usuario na API' + err);
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

  document.getElementById('cpf').readOnly = true;
  document.getElementById('cpf').classList.add('bloqueado');

  document.getElementById('data').readOnly = true;
  document.getElementById('data').classList.add('bloqueado');
}
async function atualizarUsuario(dados) {
  try{
    const token = localStorage.getItem('acessToken');
    const id = localStorage.getItem('idPaciente');
    console.log(id);
    if(!id){
      throw new Error('Usuário não está carregado ou ID inválido.');

    }
    const res = await fetch(`/api/pacientes/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
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

form.addEventListener('submit', async function(e){
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



 