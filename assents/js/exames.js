document.addEventListener('DOMContentLoaded', carregarPacientes);

document.getElementById('exameForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const exameData = {
    id_paciente: this.id_paciente.value,
    data_exame: this.data_exame.value,
    tipo_exame: this.tipo_exame.value,
    local_exame: this.local_exame.value,
    status_exame: this.status_exame.value
  };

  fetch('/api/exames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exameData)
  })
  .then(response => response.json())
  .then(data => {
    alert('Exame agendado com sucesso!');
    this.reset();
    carregarExames(); 
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Falha no agendamento');
  });
});

function carregarPacientes() {
  fetch('/api/pacientes')
    .then(response => response.json())
    .then(pacientes => {
      const select = document.querySelector('[name="id_paciente"]');
      select.innerHTML = '<option value="">Selecione o paciente</option>';
      pacientes.forEach(pac => {
        select.innerHTML += `<