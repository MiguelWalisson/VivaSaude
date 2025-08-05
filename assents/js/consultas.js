
// Adicione o SweetAlert2 no seu HTML, não neste arquivo JS!
 <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultaForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dadosConsulta = {
      paciente: document.getElementById('paciente').value,
      data: document.getElementById('data').value,
      horario: document.getElementById('horario').value,
      medico: document.getElementById('medico').value,
      especialidade: document.getElementById('especialidade').value,
      status: document.getElementById('status').value
    };

    fetch('https://localhost:8080/consultas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosConsulta)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao agendar consulta');
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Consulta agendada com sucesso!',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      });
      form.reset();
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao agendar consulta. Tente novamente.',
        showConfirmButton: true
      });
      console.error(error);
    });
  });
});
