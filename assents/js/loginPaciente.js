'use strict'

const url = 'http://localhost:8080/pacientes';

window.addEventListener('DOMContentLoaded', () => {
document.getElementById('btlogin').addEventListener('click', loginPaciente) 
});

    
function loginPaciente(){
    fetch(url ,{
        method: 'POST',
        body: JSON.stringify({email: emailInput.value, senha: SenhaInput.value}),
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(paciente =>{
        console.log("Paciente logado:", paciente);
        localStorage.setItem("Paciente logado",JSON.stringify(paciente))
        window.location.href = "/index.html";
    })
    .catch(err => console.error(err))
   
    
};
