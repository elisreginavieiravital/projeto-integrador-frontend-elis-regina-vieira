const formularioAvaliacao = document.getElementById("form-avaliacao");
const mensagemFormulario = document.getElementById("form-mensagem");

formularioAvaliacao.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mensagemFormulario.hidden = true;
    if (!formularioAvaliacao.reportValidity()) {
        return;
    }
    const avaliacao = {
        codigo: document.getElementById("codigo").value,
        data: document.getElementById("data").value,
        notas: {}
    };
    for (const competencia of competenciasAvaliacao) {
        avaliacao.notas[competencia.id] = Number(document.getElementById(competencia.id).value);
    }
    if (!avaliacaoValida(avaliacao)) {
        mensagemFormulario.textContent = "Confira o colaborador, a data e as seis notas de 1 a 5.";
        mensagemFormulario.hidden = false;
        return;
    }
    try {
        salvarAvaliacao(avaliacao);
    } catch (erro) {
        mensagemFormulario.textContent = "Não foi possível salvar a avaliação neste navegador. Verifique se o armazenamento local está disponível.";
        mensagemFormulario.hidden = false;
        return;
    }
    window.location.assign(`resultados.html?colaborador=${encodeURIComponent(avaliacao.codigo)}`);
});

formularioAvaliacao.addEventListener("reset", function () {
    mensagemFormulario.hidden = true;
    mensagemFormulario.textContent = "";
});
