const seletorResultados = document.getElementById("colaborador-resultados");
const mensagemResultados = document.getElementById("mensagem-resultados");
const painelResultados = document.getElementById("painel-resultados");

function exibirResultados() {
    painelResultados.hidden = true;
    const codigo = seletorResultados.value;
    if (!codigo) {
        mensagemResultados.textContent = "Selecione um colaborador para consultar os resultados.";
        return;
    }
    let avaliacao;
    try {
        avaliacao = lerAvaliacoes().find(item => item.codigo === codigo);
    } catch (erro) {
        mensagemResultados.textContent = "Não foi possível ler as avaliações deste navegador. Verifique o armazenamento local.";
        return;
    }
    if (!avaliacao) {
        mensagemResultados.textContent = "Este colaborador ainda não possui avaliação. Preencha o formulário para conhecer seus resultados.";
        return;
    }
    const medias = calcularMedias(avaliacao);
    document.getElementById("media-geral").textContent = medias.geral.toFixed(2).replace(".", ",");
    document.getElementById("media-tecnicas").textContent = medias.tecnicas.toFixed(2).replace(".", ",");
    document.getElementById("media-comportamentais").textContent = medias.comportamentais.toFixed(2).replace(".", ",");
    for (const competencia of competenciasAvaliacao) {
        const nota = avaliacao.notas[competencia.id];
        document.getElementById(`nota-${competencia.id}`).textContent = `${nota} / 5`;
        document.getElementById(`barra-${competencia.id}`).className = `barra-preenchimento nota-${nota}`;
    }
    const dataFormatada = avaliacao.data.split("-").reverse().join("/");
    mensagemResultados.textContent = `Resultados de ${codigo} — avaliação de ${dataFormatada}.`;
    painelResultados.hidden = false;
}

seletorResultados.addEventListener("change", exibirResultados);
const codigoInicial = new URLSearchParams(window.location.search).get("colaborador");
if (codigosDemonstrativos.includes(codigoInicial)) {
    seletorResultados.value = codigoInicial;
}
exibirResultados();
