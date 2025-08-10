// Lê o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const consultaId = urlParams.get('id');

if (!consultaId) {
  document.getElementById('detalhes-consulta').innerHTML = "<p>ID da consulta não informado.</p>";
} else {
  // Faz requisição à API
  fetch(`http://localhost:8080/api/consultas/${consultaId}`)
    .then(response => {
      if (!response.ok) throw new Error("Consulta não encontrada");
      return response.json();
    })
    .then(dados => {
      document.getElementById('detalhes-consulta').innerHTML = `
        <p><strong>Data:</strong> ${dados.data}</p>
        <p><strong>Médico:</strong> ${dados.procedimento}</p>
        <p><strong>Paciente:</strong> ${dados.diagnóstico}</p>
        <p><strong>Descrição:</strong> ${dados.especialidade_medico}</p>
        <p><strong>Prescrição:</strong> ${dados.prescricao || 'Nenhuma'}</p>
      `;
    })
    .catch(error => {
      document.getElementById('detalhes-consulta').innerHTML = `<p>Erro: ${error.message}</p>`;
    });
}
