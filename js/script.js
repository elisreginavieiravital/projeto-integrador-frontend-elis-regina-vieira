const itensCompetencias = [
    { id: "sistemas", codigo: "ADM-001", nome: "Domínio de sistemas", nota: 4, tipo: "tecnica", marcada: false },
    { id: "organizacao", codigo: "ADM-002", nome: "Organização de tarefas", nota: 3, tipo: "tecnica", marcada: false },
    { id: "qualidade", codigo: "ADM-003", nome: "Qualidade das entregas", nota: 5, tipo: "tecnica", marcada: false },
    { id: "comunicacao", codigo: "ADM-004", nome: "Comunicação", nota: 4, tipo: "comportamental", marcada: false },
    { id: "equipe", codigo: "ADM-005", nome: "Trabalho em equipe", nota: 5, tipo: "comportamental", marcada: false },
    { id: "pressao", codigo: "ADM-006", nome: "Comportamento sob pressão", nota: 3, tipo: "comportamental", marcada: false }
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

function resumirCompetencias(itens, total = itens.length, totalMarcadas = 0) {
    const soma = itens.reduce(function (total, item) {
        return total + item.nota;
    }, 0);
    const precisamAtencao = itens.filter(function (item) {
        return item.percentual < 80;
    });
    const media = itens.length === 0 ? 0 : soma / itens.length;
    return `Exibindo ${itens.length} de ${total} competências • Média exibida: ${media.toFixed(2).replace(".", ",")} / 5 • ${precisamAtencao.length} a desenvolver ou em desenvolvimento • ${totalMarcadas} marcadas para atenção.`;
}

function criarLinhaCompetencia(item) {
    const linha = document.createElement("tr");
    linha.classList.add(item.faixa.classe);
    linha.dataset.id = item.id;
    linha.classList.toggle("competencia-marcada", item.marcada);
    for (const valor of [item.codigo, item.nome, `${item.nota} / 5`, item.faixa.rotulo]) {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.append(celula);
    }
    const celulaAcao = document.createElement("td");
    const botao = document.createElement("button");
    botao.type = "button";
    botao.classList.add("botao", "botao-secundario");
    botao.dataset.acao = "marcar";
    botao.dataset.id = item.id;
    botao.setAttribute("aria-pressed", String(item.marcada));
    botao.setAttribute("aria-label", `${item.marcada ? "Retirar marcação de" : "Marcar para atenção:"} ${item.nome}`);
    const textoBotao = document.createElement("span");
    textoBotao.textContent = item.marcada ? "Retirar marcação" : "Marcar para atenção";
    botao.append(textoBotao);
    celulaAcao.append(botao);
    linha.append(celulaAcao);
    return linha;
}

function iniciarPreviaCompetencias() {
    const lista = document.querySelector("#lista-previa");
    const resumo = document.querySelector("#resumo-previa");
    const busca = document.querySelector("#busca-competencias");
    const botaoFiltro = document.querySelector("#filtrar-marcadas");
    const formulario = document.querySelector("#form-competencia-previa");
    const nome = document.querySelector("#nova-competencia");
    const nota = document.querySelector("#nova-nota");
    if (!lista || !resumo || !busca || !botaoFiltro || !formulario || !nome || !nota) {
        return;
    }
    const estado = { busca: "", somenteMarcadas: false };
    let proximoId = 7;

    function desenhar() {
        const itensProcessados = processarCompetencias(itensCompetencias);
        const visiveis = itensProcessados.filter(function (item) {
            const correspondeBusca = item.nome.toLocaleLowerCase("pt-BR").includes(estado.busca);
            return correspondeBusca && (!estado.somenteMarcadas || item.marcada);
        });
        lista.replaceChildren(...visiveis.map(criarLinhaCompetencia));
        const totalMarcadas = itensCompetencias.filter(item => item.marcada).length;
        resumo.textContent = resumirCompetencias(visiveis, itensCompetencias.length, totalMarcadas);
    }

    function tratarAcaoCompetencia(evento) {
        const botao = evento.target.closest("button[data-acao]");
        if (!botao || !lista.contains(botao) || botao.dataset.acao !== "marcar") {
            return;
        }
        const item = itensCompetencias.find(item => item.id === botao.dataset.id);
        if (!item) {
            return;
        }
        item.marcada = !item.marcada;
        desenhar();
        const botaoAtual = lista.querySelector(`button[data-id="${item.id}"]`);
        const proximoBotao = lista.querySelector("button[data-acao]");
        (botaoAtual || proximoBotao || botaoFiltro).focus();
    }

    function alternarFiltroMarcadas() {
        estado.somenteMarcadas = !estado.somenteMarcadas;
        botaoFiltro.setAttribute("aria-pressed", String(estado.somenteMarcadas));
        botaoFiltro.classList.toggle("filtro-ativo", estado.somenteMarcadas);
        desenhar();
    }

    function buscarCompetencias() {
        estado.busca = busca.value.trim().toLocaleLowerCase("pt-BR");
        desenhar();
    }

    function adicionarCompetencia(evento) {
        evento.preventDefault();
        if (!formulario.reportValidity()) {
            return;
        }
        const nomeCompetencia = nome.value.trim();
        const notaCompetencia = Number(nota.value);
        if (nomeCompetencia === "" || !Number.isInteger(notaCompetencia) || notaCompetencia < 1 || notaCompetencia > 5) {
            return;
        }
        itensCompetencias.push({
            id: `extra-${proximoId}`,
            codigo: `DEMO-${proximoId}`,
            nome: nomeCompetencia,
            nota: notaCompetencia,
            tipo: "adicional",
            marcada: false
        });
        proximoId++;
        formulario.reset();
        estado.busca = "";
        estado.somenteMarcadas = false;
        busca.value = "";
        botaoFiltro.setAttribute("aria-pressed", String(false));
        botaoFiltro.classList.remove("filtro-ativo");
        desenhar();
        nome.focus();
    }

    lista.addEventListener("click", tratarAcaoCompetencia);
    botaoFiltro.addEventListener("click", alternarFiltroMarcadas);
    busca.addEventListener("input", buscarCompetencias);
    formulario.addEventListener("submit", adicionarCompetencia);
    desenhar();
}

iniciarPreviaCompetencias();
