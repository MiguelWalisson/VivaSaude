'use strict'


let usuario = null;

window.addEventListener('DOMContentLoaded', fetchUsuario); 
async function fetchUsuario(){
    try{
        const response = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include',
            
        });
        console.log("Get paciente", response)
        if(response.status === 401){
            console.log('401 - Não autenticado')
            return null;       
        }
        if(!response.ok){
            console.log("Usuário não logado!");
            return null;
        }
         usuario = await response.json();
        console.log('Usuário carregado!', usuario);
        nomePacienteTitulo();
    } catch (e) {
        console.log('Erro ao buscar usuario na API' + e.message);
        alert('Erro ao carregar dados do paciente!');
   }
} 
  

function nomePacienteTitulo(){
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
 


