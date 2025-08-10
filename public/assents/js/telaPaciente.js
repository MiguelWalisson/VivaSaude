'use strict'


let usuario = null;

window.addEventListener('DOMContentLoaded', fetchUsuario); 
async function fetchUsuario(){
    try{
        const token = localStorage.getItem('acessToken');
        if(!token){
            console.log("Nenhum token JWT encontrado!")
            return null;
        }
        const response = await fetch('/api/auth/me', {
            method: 'GET',
           
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type' : 'application/json'
                }
            
        });
        if(response.status === 401 || response.status === 403){
            console.log('Token inválido ou não autorizado!')
            return null;       
        }
        if(!response.ok){
            console.log("Erro ao buscar usuário!");
            return null;
        }
         usuario = await response.json();
        console.log('Usuário carregado!', usuario);
        nomePacienteTitulo(usuario);
    } catch (e) {
        console.log('Erro ao buscar usuario na API' + e.message);
        alert('Erro ao carregar dados do paciente!');
   }
} 
  

function nomePacienteTitulo(usuario){
    try{
        if(!usuario || !usuario.id){
            throw new Error('Usuário não carregado!')
        }
        document.getElementById('pacienteNome').innerHTML = usuario.nome || '';
        console.log('Nome do paciente exibido', usuario.nome)

    }catch(e){
        console.log("Erro ao carregar usuário!" + e.message)
        alert('Erro ao carregar o usuário!');
    }
   
}
 


