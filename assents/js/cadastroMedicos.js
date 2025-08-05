document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('medicoForm');
  const mensagem = document.getElementById('mensagem');
  const tabela = document.getElementById('tabela-medicos');
  const tbody = tabela.querySelector('tbody');
  let medicos = [];
  let editIndex = null;

  // Funções para integração futura com API REST -----------------
  const API_URL = 'https://sua-api.com/medicos'; // Troque para sua URL real

  async function fetchMedicos() {
    // try {
    //   const res = await fetch(API_URL);
    //   medicos = await res.json();
    //   renderTabela();
    // } catch (e) {
    //   exibirMensagem('Erro ao buscar médicos na API', true);
    // }
  }

  async function criarMedico(medico) {
    // try {
    //   const res = await fetch(API_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(medico)
    //   });
    //   return await res.json();
    // } catch (e) {
    //   exibirMensagem('Erro ao cadastrar médico na API', true);
    // }
  }

  async function atualizarMedico(id, medico) {
    // try {
    //   const res = await fetch(`${API_URL}/${id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(medico)
    //   });
    //   return await res.json();
    // } catch (e) {
    //   exibirMensagem('Erro ao atualizar médico na API', true);
    // }
  }

  async function deletarMedico(id) {
    // try {
    //   await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    // } catch (e) {
    //   exibirMensagem('Erro ao excluir médico na API', true);
    // }
  }
  // -------------------------------------------------------------

  function exibirMensagem(msg, erro = false) {
    mensagem.textContent = msg;
    mensagem.style.color = erro ? 'red' : 'green';
    setTimeout(() => mensagem.textContent = '', 2500);
  }

  function limparFormulario() {
    form.reset();
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Cadastrar';
  }

  function renderTabela() {
    tbody.innerHTML = '';
    if (medicos.length === 0) {
      tabela.style.display = 'none';
      return;
    }
    tabela.style.display = '';
    medicos.forEach((medico, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${medico.nome}</td>
        <td>${medico.crm}</td>
        <td>${medico.especialidade}</td>
        <td>${medico.email}</td>
        <td>${medico.telefone}</td>
        <td>
          <button type="button" data-edit="${idx}">Editar</button>
          <button type="button" data-del="${idx}">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const medico = {
      nome: form.nome.value.trim(),
      crm: form.crm.value.trim(),
      especialidade: form.especialidade.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim(),
      senha: form.senha.value.trim()
    };

    if (editIndex === null) {
      // await criarMedico(medico); // Descomente para usar API
      medicos.push(medico);
      exibirMensagem('Médico cadastrado com sucesso!');
    } else {
      // await atualizarMedico(editIndex, medico); // Descomente para usar API
      medicos[editIndex] = medico;
      exibirMensagem('Médico atualizado com sucesso!');
    }
    limparFormulario();
    renderTabela();
  });

  tbody.addEventListener('click', async function(e) {
    if (e.target.hasAttribute('data-edit')) {
      editIndex = Number(e.target.getAttribute('data-edit'));
      const medico = medicos[editIndex];
      form.nome.value = medico.nome;
      form.crm.value = medico.crm;
      form.especialidade.value = medico.especialidade;
      form.email.value = medico.email;
      form.telefone.value = medico.telefone;
      form.senha.value = medico.senha;
      form.querySelector('button[type="submit"]').textContent = 'Salvar';
    }
    if (e.target.hasAttribute('data-del')) {
      const idx = Number(e.target.getAttribute('data-del'));
      if (confirm('Deseja excluir este médico?')) {
        // await deletarMedico(idx); // Descomente para usar API
        medicos.splice(idx, 1);
        exibirMensagem('Médico excluído!');
        limparFormulario();
        renderTabela();
      }
    }
  });

  // fetchMedicos(); // Descomente para buscar da API ao carregar
  renderTabela();
});