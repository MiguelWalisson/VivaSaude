'use strict';

const limparFormulario = () => {
    document.getElementById('endereco').value = '';

}

const preencherEndereco = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro.endereco.bairro.endereco.localidade.endereco.uf;

};

const buscarCep = async()=>{
    try{
        const cep = document.getElementById('CEP').value;
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const regexcep = /^[0-9]{8}$/;

        if(!regexcep.test(cep)){
            document.getElementById('cep').value = 'Formato invalido!'
            console.error("CEP não encontrado!")
            limparFormulario();
            return;
        }
        const dados = await fetch(url);
        const endereco = await dados.json();
        
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('cep').value = 'CEP não encontrado!'
            console.error("CEP não encontrado!")
            limparFormulario();
            return;
        }
        preencherEndereco(endereco);
        console.log(endereco);
    }catch(error){
        console.error("Erro ao buscar cep:",error);
        limparFormulario();
    }
};
document.getElementById('cep')
.addEventListener('focusout',buscarCep);

const CadastroPaciente =async(event) => {
    event.preventDefault();
    try{

    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value = '';
    const dataNascimento = document.getElementById('dataNascimento').value;
    const genero = document.getElementById('genero').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senhaConfirm = document.getElementById('confirmarSenha').value;
    
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
    const responsePaciente = await fetch('http://localhost:8080/pacientes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DadosPaciente)
    })
     if (responsePaciente.ok){
             CadastroPaciente = await apiresposta.json();
            alert("Funcionario Cadastrado!");
            document.getElementById('formcadastroFuncionario').reset();
        } else{
            const erroTexto = await apiresposta.text();
            alert("Erro ao cadastrar funcionário :" + erroTexto);
        }
}catch (error) {
        console.error('Erro error');
}
};

