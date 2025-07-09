'use strict';


const CadastroPaciente =async(event) => {
    event.preventDefault();
    try{

    
    const nome = document.getElementById('Nome Completo').value = '';
    const CPF = document.getElementById('CPF').value = '';
    const dataNascimento = document.getElementById('Data de Nascimento').value = '';
    const genero = document.getElementById('Gênero').value = '';
    const telefone = document.getElementById('Telefone').value = '';
    const CEP = document.getElementById('CEP').value = '';
    const endereco = document.getElementById('endereco').value = '';
    const email = document.getElementById('email').value = '';
    const senha = document.getElementById('Senha').value = '';
    const senhaConfirm = document.getElementById('Confirmar Senha').value = '';
    
    const DadosPaciente = {
        nome: nome,
        CPF: CPF,
        dataNascimento: dataNascimento,
        genero: genero,
        telefone: telefone,
        CEP: CEP,
        endereco: endereco,
        email: email,
        senha: senha,
        senhaConfirm: senhaConfirm
    };
console.log('Enviando dados para API:', DadosPaciente);
    const responsePaciente = await fetch('http://localhost:8080/pacientes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DadosPaciente)
    })
}catch (error) {
        console.error('Erro error');
}
};
CadastrarPaciente.addEventListener('click', (event) => {
    event.preventDefault();
    CadastrarPaciente();
    alert('Cadastro realizado com sucesso!');
});

