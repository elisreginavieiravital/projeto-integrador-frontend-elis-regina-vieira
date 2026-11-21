const itensCompetencias = [
    { id: "sistemas", codigo: "ADM-001", nome: "Domínio de sistemas", nota: 4, tipo: "tecnica" },
    { id: "organizacao", codigo: "ADM-002", nome: "Organização de tarefas", nota: 3, tipo: "tecnica" },
    { id: "qualidade", codigo: "ADM-003", nome: "Qualidade das entregas", nota: 5, tipo: "tecnica" },
    { id: "comunicacao", codigo: "ADM-004", nome: "Comunicação", nota: 4, tipo: "comportamental" },
    { id: "equipe", codigo: "ADM-005", nome: "Trabalho em equipe", nota: 5, tipo: "comportamental" },
    { id: "pressao", codigo: "ADM-006", nome: "Comportamento sob pressão", nota: 3, tipo: "comportamental" }
];

function calcularPercentualCompetencia(item, notaMaxima = 5) {
    return (item.nota / notaMaxima) * 100;
}

function classificarPercentualCompetencia(percentual) {
    if (percentual < 60) {
        return { rotulo: "A desenvolver", classe: "faixa-inicial" };
    }
    if (percentual < 80) {
        return { rotulo: "Em desenvolvimento", classe: "faixa-intermediaria" };
    }
    return { rotulo: "Consolidado", classe: "faixa-consolidada" };
}

function processarCompetencias(itens) {
    return itens.map(function (item) {
        const percentual = calcularPercentualCompetencia(item);
        return { ...item, percentual, faixa: classificarPercentualCompetencia(percentual) };
    });
}

function resumirCompetencias(itens) {
    const soma = itens.reduce(function (total, item) {
        return total + item.nota;
    }, 0);
    const precisamAtencao = itens.filter(function (item) {
        return item.percentual < 80;
    });
    const media = itens.length === 0 ? 0 : soma / itens.length;
    return `${itens.length} competências • Média: ${media.toFixed(2).replace(".", ",")} / 5 • ${precisamAtencao.length} a desenvolver ou em desenvolvimento.`;
}

function criarLinhaCompetencia(item) {
    const linha = document.createElement("tr");
    linha.classList.add(item.faixa.classe);
    for (const valor of [item.codigo, item.nome, `${item.nota} / 5`, item.faixa.rotulo]) {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.append(celula);
    }
    return linha;
}

function iniciarPreviaCompetencias() {
    const lista = document.querySelector("#lista-previa");
    const resumo = document.querySelector("#resumo-previa");
    if (lista === null || resumo === null) {
        return;
    }
    const itensProcessados = processarCompetencias(itensCompetencias);
    for (const item of itensProcessados) {
        lista.append(criarLinhaCompetencia(item));
    }
    resumo.textContent = resumirCompetencias(itensProcessados);
}

iniciarPreviaCompetencias();
