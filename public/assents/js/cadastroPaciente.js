'use strict';

const limparFormulario = () => {
    document.getElementById('endereco').value = '';

}
const limparCep =() => {
    document.getElementById('CEP').value = '';
}

 document.getElementById('CEP').addEventListener('focusout', consultarCEP);
 document.getElementById('btcadastro').addEventListener('click',preencherCadastro);
        
        function consultarCEP() {
            
            const cep = document.getElementById('CEP').value.replace(/\D/g, '');
            
            
            if (cep.length !== 8) {
                alert('CEP inválido! Digite um CEP com 8 dígitos.');
                limparCep();

                return;
            }
            
            
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (!response.ok) {
                        
                    throw new Error('CEP não encontrado');
                        
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.erro) {
                        throw new Error('CEP não encontrado');
                    }
                    const resultadoFormatado = `
                        ${data.logradouro || ''},
                        ${data.bairro || ''},
                        ${data.localidade || ''},
                        ${data.uf || ''}
            
                    `.replace(/^\s+/gm, '');
                    
                    
                    document.getElementById('endereco').value = resultadoFormatado;
                })
                .catch(error => {
                    document.getElementById('endereco').value = '';
                    alert(error.message);
                    limparCep();
                    
                });
        }
async function preencherCadastro (event){
    event.preventDefault();
    try{

    
    const nome = document.getElementById('NomeCompleto').value;
    const cpf = document.getElementById('CPF').value;
    const dataNascimento = document.getElementById('Datadenascimento').value;
    const genero = document.getElementById('Gênero').value;
    const telefone = document.getElementById('Telefone').value;
    const cep = document.getElementById('CEP').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('Senha').value;
    const senhaConfirm = document.getElementById('ConfirmarSenha').value;
    
    const DadosPaciente = {
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
        genero: genero,
        telefone: telefone,
        cep: cep,
        endereco: endereco,
        email: email,
        senha: senha,
        senhaConfirm: senhaConfirm
    };
console.log('Enviando dados para API:', DadosPaciente);
    const id = localStorage.getItem('idPaciente');
    const responsePaciente = await fetch('/api/pacientes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(DadosPaciente)
    })
     if (responsePaciente.ok){
            
            alert('Paciente Cadastrado!');
            document.getElementById('formcadastroPaciente').reset();
            setTimeout(() =>{
                window.location.href = "/Pages/loginPaciente.html?tipo=paciente";

            }, 1500);
            return;
        } else{
            const erroTexto = await responsePaciente.text();
            alert("Erro ao cadastrar paciente :" + erroTexto);
            return;
        }
}catch (error) {
        console.error('Erro', error);
}

};
document.getElementById('Telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    
    if (!value.startsWith('55')) {
        value = '55' + value.replace(/^55/, '');
    }
    
    
    value = value.substring(0, 13);
    
    
    let formatted = '+55';
    
    if (value.length > 2) {
        formatted += ` (${value.substring(2, 4)}`;
    }
    if (value.length > 4) {
        formatted += `) ${value.substring(4, 9)}`;
    }
    if (value.length > 9) {
        formatted += `-${value.substring(9, 13)}`;
    }
    
    e.target.value = formatted;
});
document.getElementById('CEP').addEventListener('input', function(e) {
    
    let value = e.target.value.replace(/\D/g, '');
    
    
    value = value.substring(0, 8);
    
    
    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    e.target.value = value;
});
document.getElementById('CPF').addEventListener('input', function(e) {
    
    let value = e.target.value.replace(/\D/g, '');
    
    
    value = value.substring(0, 11);
    
    
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    e.target.value = value;
});

