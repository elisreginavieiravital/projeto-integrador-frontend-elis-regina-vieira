/*
Tema: análise de competências técnicas e comportamentais.
Entrada: nota mínima entre 1 e 5 e códigos de consulta até "sair".
Processamento: classificar notas, identificar grupos e resumir seis avaliações simuladas.
Saída: relatório em console.table e resumo em frases.
Pseudocódigo:
1. Declarar as avaliações simuladas.
2. Ler, converter e validar a nota mínima.
3. Percorrer os itens, classificar as notas e identificar os grupos.
4. Acumular notas, contar resultados e localizar a maior nota.
5. Exibir o relatório e a média.
6. Consultar códigos até receber "sair" ou cancelar.
*/

function executarAnaliseDemonstrativa() {
    const avaliacoes = [
        { codigo: "ADM-001", competencia: "Domínio de sistemas", nota: 4, tipo: "tecnica" },
        { codigo: "ADM-002", competencia: "Organização de tarefas", nota: 3, tipo: "tecnica" },
        { codigo: "ADM-003", competencia: "Qualidade das entregas", nota: 5, tipo: "tecnica" },
        { codigo: "ADM-004", competencia: "Comunicação", nota: 4, tipo: "comportamental" },
        { codigo: "ADM-005", competencia: "Trabalho em equipe", nota: 5, tipo: "comportamental" },
        { codigo: "ADM-006", competencia: "Comportamento sob pressão", nota: 3, tipo: "comportamental" }
    ];

    const entradaLimite = prompt("Informe a nota mínima da análise (1 a 5):");

    if (entradaLimite === null) {
        console.log("Análise cancelada.");
    } else if (entradaLimite.trim() === "") {
        console.log("Informe uma nota; a entrada está vazia.");
    } else {
        const notaMinima = Number(entradaLimite);

        if (Number.isNaN(notaMinima) || notaMinima < 1 || notaMinima > 5) {
            console.log("Nota inválida. Informe um número entre 1 e 5.");
        } else {
            let somaNotas = 0;
            let totalAcimaLimite = 0;
            let maiorNota = -Infinity;
            let totalTecnicas = 0;
            const relatorio = [];

            for (const avaliacao of avaliacoes) {
                let classificacao;
                if (avaliacao.nota < 3) {
                    classificacao = "A desenvolver";
                } else if (avaliacao.nota < 4) {
                    classificacao = "Em desenvolvimento";
                } else {
                    classificacao = "Consolidado";
                }

                let grupo;
                switch (avaliacao.tipo) {
                    case "tecnica":
                        grupo = "Competência técnica";
                        break;
                    case "comportamental":
                        grupo = "Competência comportamental";
                        break;
                    default:
                        grupo = "Competência sem grupo definido";
                        break;
                }

                somaNotas += avaliacao.nota;
                if (avaliacao.nota >= notaMinima) {
                    totalAcimaLimite++;
                }
                if (avaliacao.nota > maiorNota) {
                    maiorNota = avaliacao.nota;
                }
                if (avaliacao.tipo === "tecnica") {
                    totalTecnicas++;
                }

                relatorio.push({
                    codigo: avaliacao.codigo,
                    competencia: avaliacao.competencia,
                    nota: avaliacao.nota,
                    grupo,
                    classificacao
                });
            }

            const mediaNotas = somaNotas / avaliacoes.length;
            console.table(relatorio);
            console.log(`Total: ${avaliacoes.length}. Média: ${mediaNotas.toFixed(2)}. Maior nota: ${maiorNota}.`);
            console.log(`Com nota mínima ${notaMinima}: ${totalAcimaLimite}. Competências técnicas: ${totalTecnicas}.`);

            /*
            Teste de mesa do laço principal, com notaMinima = 4:
            Volta | Código  | Nota | Soma | Total >= 4 | Maior | Técnicas | Classificação
            1     | ADM-001 | 4    | 4    | 1          | 4     | 1        | Consolidado
            2     | ADM-002 | 3    | 7    | 1          | 4     | 2        | Em desenvolvimento
            3     | ADM-003 | 5    | 12   | 2          | 5     | 3        | Consolidado
            Ao final: soma = 24, média = 4, maior = 5, total >= 4 = 4 e técnicas = 3.
            */

            let comando = "";
            while (comando !== "sair") {
                const entradaConsulta = prompt("Consulte um código de ADM-001 a ADM-006 ou digite sair:");
                if (entradaConsulta === null) {
                    comando = "sair";
                } else {
                    comando = entradaConsulta.trim().toLowerCase();
                    if (comando !== "sair") {
                        let encontrado = false;
                        for (const item of relatorio) {
                            if (item.codigo.toLowerCase() === comando) {
                                console.log(`${item.codigo}: ${item.competencia}, nota ${item.nota}, ${item.classificacao}.`);
                                encontrado = true;
                            }
                        }
                        if (!encontrado) {
                            console.log(`Código não encontrado: "${entradaConsulta}". Use ADM-001 a ADM-006 ou sair.`);
                        }
                    }
                }
            }
            console.log("Consulta encerrada.");
        }
    }
}

document.getElementById("executar-analise").addEventListener("click", executarAnaliseDemonstrativa);
