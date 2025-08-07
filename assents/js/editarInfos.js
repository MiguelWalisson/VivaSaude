'use strict'


console.log("Carregando dados do paciente...");
window.addEventListener('DOMContentLoaded',() => {
const url = 'http://localhost:8080/pacientes';
fetch(url)
.then(res =>{
    if(!res.ok) throw new Error('Erro na requisição:');
    return res.json();
    })
    .then(data => {
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


    


  

   
   
    
    
   
        
        