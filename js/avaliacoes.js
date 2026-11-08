const chaveAvaliacoes = "competencias.avaliacoes.v1";
const codigosDemonstrativos = ["ADM-001", "ADM-002", "ADM-003", "ADM-004", "ADM-005", "ADM-006"];
const competenciasAvaliacao = [
    { id: "sistemas", nome: "Domínio de sistemas", tipo: "tecnica" },
    { id: "organizacao", nome: "Organização de tarefas", tipo: "tecnica" },
    { id: "qualidade", nome: "Qualidade das entregas", tipo: "tecnica" },
    { id: "comunicacao", nome: "Comunicação", tipo: "comportamental" },
    { id: "equipe", nome: "Trabalho em equipe", tipo: "comportamental" },
    { id: "pressao", nome: "Comportamento sob pressão", tipo: "comportamental" }
];

function avaliacaoValida(avaliacao) {
    if (!avaliacao || !codigosDemonstrativos.includes(avaliacao.codigo) || !avaliacao.notas) {
        return false;
    }
    if (typeof avaliacao.data !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(avaliacao.data)) {
        return false;
    }
    const data = new Date(`${avaliacao.data}T00:00:00Z`);
    if (Number.isNaN(data.getTime()) || data.toISOString().slice(0, 10) !== avaliacao.data) {
        return false;
    }
    for (const competencia of competenciasAvaliacao) {
        const nota = avaliacao.notas[competencia.id];
        if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
            return false;
        }
    }
    return true;
}

function lerAvaliacoes() {
    const conteudo = localStorage.getItem(chaveAvaliacoes);
    if (conteudo === null) {
        return [];
    }
    const avaliacoesSalvas = JSON.parse(conteudo);
    if (!Array.isArray(avaliacoesSalvas) || !avaliacoesSalvas.every(avaliacaoValida)) {
        throw new Error("Avaliações inválidas.");
    }
    return avaliacoesSalvas;
}

function salvarAvaliacao(avaliacao) {
    if (!avaliacaoValida(avaliacao)) {
        throw new Error("Avaliação inválida.");
    }
    const avaliacoesSalvas = lerAvaliacoes();
    const indice = avaliacoesSalvas.findIndex(item => item.codigo === avaliacao.codigo);
    if (indice === -1) {
        avaliacoesSalvas.push(avaliacao);
    } else {
        avaliacoesSalvas[indice] = avaliacao;
    }
    localStorage.setItem(chaveAvaliacoes, JSON.stringify(avaliacoesSalvas));
}

function calcularMedias(avaliacao) {
    let somaTecnicas = 0;
    let somaComportamentais = 0;
    for (const competencia of competenciasAvaliacao) {
        if (competencia.tipo === "tecnica") {
            somaTecnicas += avaliacao.notas[competencia.id];
        } else {
            somaComportamentais += avaliacao.notas[competencia.id];
        }
    }
    return {
        geral: (somaTecnicas + somaComportamentais) / 6,
        tecnicas: somaTecnicas / 3,
        comportamentais: somaComportamentais / 3
    };
}
