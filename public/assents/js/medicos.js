document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('medicoForm');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("Médico cadastrado!");

    mensagem.textContent = "Médico cadastrado com sucesso!";
    form.reset();
  });
});
