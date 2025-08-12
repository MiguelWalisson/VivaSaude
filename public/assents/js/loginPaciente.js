'use strict'

const url = '/api/auth/login';
const urlParams = new URLSearchParams(window.location.search);
const tipo = urlParams.get('tipo');

async function loginPaciente(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('Senha').value;
    const mensagem = document.getElementById('mensagem');
    try{
         console.log("Post para login", email, senha, tipo)
        const response = await fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, senha, tipo}),
            }
           
    );
    
        if(response.ok){
            const data = await response.json();
            localStorage.setItem('acessToken', data.token);
             if (tipo.toLowerCase() === 'medico') {
            localStorage.setItem('idMedico', data.idMedico);
            } else if (tipo.toLowerCase() === 'paciente') {
            localStorage.setItem('idPaciente', data.idPaciente);
            }

            console.log('Login bem-sucedido! Token e ID salvos.');
            if(!data) throw new Error("Token não recebido!");
        
            
            
            
            mensagem.style.color = 'green';
            mensagem.textContent = `Bem-vindo(a), ${data.nome}`;
            setTimeout(() =>{
                window.location.href = "/Pages/indexpaciente.html";
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


