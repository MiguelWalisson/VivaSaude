'use strict'

const url = 'http://localhost:8080/auth/login';
const urlParams = new URLSearchParams(window.location.search);
const tipo = urlParams.get('tipo');

async function loginPaciente(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('Senha').value;
    const mensagem = document.getElementById('mensagem');
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, senha, tipo})
        });
        if(response.ok){
            const paciente = await response.json();
            console.log("Paciente logado:", paciente);
            localStorage.setItem("pacienteLogado", JSON.stringify(paciente));

            mensagem.style.color = 'green';
            mensagem.textContent = `Bem-vindo(a), ${paciente.nome}`;
             setTimeout(() =>{
            window.location.href = "/index.html";
            }, 1500);
        }
        else if (response.status ===  401)
        {
            mensagem.style.color = 'red';
            mensagem.textContent = "Email ou senha incorretos!";

        }
        else{
            throw new Error('Erro no servidor');
        }

    }catch(err){
    console.error(err);
    mensagem.style.color = 'red';
    mensagem.textContent = 'Erro ao conectar com o servidor';

    }  
    
}
document.getElementById('btlogin').addEventListener('click', loginPaciente);


