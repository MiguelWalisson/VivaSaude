'use strict'


const url = 'http://localhost:8080/pacientes';
let usuario = null;

async function fetchUsuario(){
    try{
        const res = await fetch(url +'/1');
        if(!res.ok) throw new Error('Erro na requisição' + res.status);
    usuario = await res.json();
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
window.addEventListener('DOMContentLoaded', fetchUsuario);  


