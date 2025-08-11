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
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, senha, tipo}),
            }
           
    );
    
        if(response.ok){
            const json = await response.json();
            const token = json.token;
            console.log("Paciente logado:", token);
            if(!token) throw new Error("Token não recebido!");
            localStorage.setItem('acessToken', token);
            
            mensagem.style.color = 'green';
            mensagem.textContent = `Bem-vindo(a), ${json.nome}`;
            setTimeout(() =>{
                window.location.href = "/Pages/indexpaciente.html";
            }, 1500);
            return token;
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


