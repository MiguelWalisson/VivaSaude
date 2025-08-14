document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('acessToken'); 
  console.log("Token recebido: ", token);

  const medicos = [
    { nome: "Dr. João Carvalho", cpf: "12345", especialidade: "Psicologia", crm: "123456" },
    { nome: "Dra. Marina Silva", cpf: "123456", especialidade: "Geriatria", crm: "123456" },
    { nome: "Dr. Lucas Almeida", cpf: "1234567", especialidade: "Nutrição", crm: "123456" },
    { nome: "Dra. Fernanda Costa", cpf: "12345678", especialidade: "Ginecologia", crm: "123456" }
  ];

  localStorage.setItem('medicos', JSON.stringify(medicos));

  function carregarMedicosPorEspecialidade() {
    const especialidadeSelecionada = document.getElementById('selectEspecialidade').value;
    const todosMedicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const medicosFiltrados = todosMedicos.filter(m => m.especialidade === especialidadeSelecionada);

    const selectMedicos = document.getElementById('selectMedicos');
    selectMedicos.innerHTML = '';

    if (medicosFiltrados.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'Nenhum médico disponível';
      selectMedicos.appendChild(option);
      return;
    }

    medicosFiltrados.forEach(medico => {
      const option = document.createElement('option');
      option.value = medico.cpf;
      option.textContent = medico.nome;
      option.dataset.nome = medico.nome;
      selectMedicos.appendChild(option);
    });
  }

  // Atualiza lista de médicos sempre que a especialidade muda
  document.getElementById('selectEspecialidade').addEventListener('change', carregarMedicosPorEspecialidade);

  document.getElementById('agendar').addEventListener('click', (e) => {
    e.preventDefault();

    const selectMedico = document.getElementById('selectMedicos');
    const medicoNome = selectMedico.selectedOptions[0]?.dataset.nome || '';
    const especialidade = document.getElementById('selectEspecialidade').value;

    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const medicoSelecionado = medicos.find(m => m.nome === medicoNome && m.especialidade === especialidade);

    if (!medicoSelecionado) {
      alert('Selecione um médico válido!');
      return;
    }

    const dadosConsulta = {
      dataConsulta: document.getElementById('inputDataConsulta').value,
      horaConsulta: document.getElementById('horario').value + ':00',
      especialidade,
      convenio: '',
      descConsulta: '',
      medico: {
        cpf: medicoSelecionado.cpf,
        nome: medicoSelecionado.nome
      }
    };

    salvarConsultaLocal(dadosConsulta);
    console.log('Consulta salva localmente:', dadosConsulta);
  });

  function salvarConsultaLocal(dadosConsulta) {
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas.push(dadosConsulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    console.log('Dados da consulta salvos no localStorage:', dadosConsulta);
  }

});