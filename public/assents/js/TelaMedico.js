  document.addEventListener('DOMContentLoaded', function() {
    console.log('Painel médico carregado');

    const appointmentButtons = document.querySelectorAll('.appointment-actions button');
    appointmentButtons.forEach(button => {
      button.addEventListener('click', function() {
        const appointmentItem = this.closest('.appointment-item');
        const patientName = appointmentItem.querySelector('.appointment-patient-name').textContent;
        alert(`Iniciando consulta com ${patientName}`);

       
      });
    });
  });