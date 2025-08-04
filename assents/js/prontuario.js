document.getElementById('prontuarioForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (!validarCRM(this.crm_medico.value)) {
    alert('CRM inválido! Formato correto: CRM/UF 123456');
    return;
  }

  const prontuarioData = {
    nome_medico: this.nome_medico.value,
    crm_medico: this.crm_medico.value,
    sintomas: this.sintomas.value,
    diagnostico: this.diagnostico.value,
    prescricao: this.prescricao.value
  };

  fetch('/api/prontuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prontuarioData)
  })
  .then(response => response.json())
  .then(data => {
    alert('Prontuário salvo com sucesso!');
    this.sintomas.value = '';
    this.diagnostico.value = '';
    this.prescricao.value = '';
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Falha ao salvar prontuário');
  });
});

function validarCRM(crm) {
  return /^CRM\/[A-Z]{2}\s\d{6}$/.test(crm);
}

document.querySelector('[name="crm_medico"]')?.addEventListener('blur', function() {
  if (!validarCRM(this.value)) {
    this.style.borderColor = 'red';
  } else {
    this.style.borderColor = '#ccc';
  }
});