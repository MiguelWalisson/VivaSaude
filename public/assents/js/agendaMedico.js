'use strict'
const calendar = new FullCalendar.Calendar(calendarEl, {
  events: async function(fetchInfo, successCallback, failureCallback) {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/agenda-medico/${medicoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const consultas = await res.json();

      const eventos = consultas.map(c => ({
        title: `${c.paciente.nome} - ${c.especialidade}`,
        start: `${c.data_consulta}T${c.hora_consulta}`
      }));

      successCallback(eventos);
    } catch (err) {
      failureCallback(err);
    }
  }
});
calendar.render();