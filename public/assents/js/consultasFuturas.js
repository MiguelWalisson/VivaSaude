document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".caixa-consultas");
    
    // Pegar as consultas do localStorage
    const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    
    // Limpar cards existentes (exceto título e subtítulo)
    container.querySelectorAll(".card-consulta").forEach(card => card.remove());
    
    // Criar cards dinamicamente
    consultas.forEach(consulta => {
        const card = document.createElement("div");
        card.classList.add("card-consulta");
        
        card.innerHTML = `
            <p class="tipo-consulta">${consulta.especialidade}</p>
            <p><strong>Dia:</strong> ${consulta.dataConsulta}</p>
            <p><strong>Horário:</strong> ${consulta.horaConsulta}</p>
            <p><strong>Médico:</strong> ${consulta.medico?.nome || 'Não informado'}</p>
        `;
        
        container.appendChild(card);
    });
});
