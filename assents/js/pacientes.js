document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pacienteForm');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("Formulário enviado!");

    mensagem.textContent = "Paciente cadastrado com sucesso!";
    form.reset();
  });
});
