document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultaForm');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', (e) => {
    e.preventDefault();


    console.log("Consulta agendada!");

    mensagem.textContent = "Consulta agendada com sucesso!";
    form.reset();
  });
});
