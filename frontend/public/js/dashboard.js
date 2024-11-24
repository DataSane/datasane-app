document.addEventListener('DOMContentLoaded', function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const dashboardEndpoint = '/api/dashboard';

    const url = `${actualIP}${dashboardEndpoint}`;

    let selectCategoria = document.querySelector("#selectCategoria");
    let selectPorteMunicipio = document.querySelector("#selectPorteMunicipio");
    let categoriaSaneamento;
    let porteMunicipio;
    let menosOuMaisAfetado;

    let primeiroMaisCritico;
    let segundoMaisCritico;
    let terceiroMaisCritico;
    let quartoMaisCritico;
    let quintoMaisCritico;

    let myChart;
    let labels; // Nomes das Barras
    let valores; // Valores das barras
    let data;
    let limite; // Valor da linha limite
    let cores;
    let coberturaChart;

    verificarCategoria();
    verificarPorteMunicipio();
    verificarMenosOuMaisAfetados();
    getMaisCriticos();
    atualizarDadosGraficoMarcoLegal();
    plotarGraficoMarcoLegal();

    function verificarCategoria() {
        let categoriaSelecionada = selectCategoria.value;

        limite = 10;

        if (categoriaSelecionada == "agua_value") {
            categoriaSaneamento = "semAgua";
            coberturaChart = "Água";
            limite = 1;
        } else if (categoriaSelecionada == "esgoto_value") {
            categoriaSaneamento = "semEsgoto";
            coberturaChart = "Tratamento de Esgoto";
        } else if (categoriaSelecionada == "lixo_value") {
            categoriaSaneamento = "semLixo";
            coberturaChart = "Coleta de Lixo";
        }

        console.log(categoriaSelecionada);
    }

    function verificarPorteMunicipio() {
        let porteSelecionado = selectPorteMunicipio.value;

        if (porteSelecionado == "grande_value") {
            porteMunicipio = "grande";
        } else if (porteSelecionado == "medio_value") {
            porteMunicipio = "medio";
        } else if (porteSelecionado == "pequeno_value") {
            porteMunicipio = "pequeno";
        } else {
            porteMunicipio = "geral";
        }
    }

    function verificarMenosOuMaisAfetados() {
        let menosOuMaisSelecionado = selectMenosOuMaisSelecionado.value;

        if (menosOuMaisSelecionado == "maisAfetado_value") {
            menosOuMaisAfetado = "maisAfetado";
        } else {
            menosOuMaisAfetado = "menosAfetado";
        }
    }

    selectCategoria.addEventListener("change", function () {
        verificarCategoria();
        atualizarDadosGraficoMarcoLegal();
    });

    selectPorteMunicipio.addEventListener("change", function () {
        verificarPorteMunicipio();
        atualizarDadosGraficoMarcoLegal();
    });

    selectMenosOuMaisSelecionado.addEventListener("change", function () {
        verificarMenosOuMaisAfetados();
        atualizarDadosGraficoMarcoLegal();
    });

    async function getMaisCriticos() {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoriaSaneamento: categoriaSaneamento,
                porteMunicipio: porteMunicipio,
                menosOuMaisAfetado: menosOuMaisAfetado
            })
        });

        if (!response.ok) {
            throw new Error('Error in getMaisCriticos');
        }

        return await response.json();
    }

async function plotarGraficoMarcoLegal() {
    let arrayMaisCriticos = await getMaisCriticos();

    primeiroMaisCritico = arrayMaisCriticos[0];
    segundoMaisCritico = arrayMaisCriticos[1];
    terceiroMaisCritico = arrayMaisCriticos[2];
    quartoMaisCritico = arrayMaisCriticos[3];
    quintoMaisCritico = arrayMaisCriticos[4];

    labels = [arrayMaisCriticos.map(municipio => municipio.nome)];
    valores = [arrayMaisCriticos.map(valores => valores.populacaoSemAgua)];
    cores = valores.map(valor => valor > limite ? 'rgb(6, 204, 57)' : 'rgb(241, 57, 57)');

    data = {
        labels: labels,
        datasets: [{
            axis: 'y',
            label: 'Cobertura município',
            data: valores,
            fill: false,
            backgroundColor: cores,
            borderWidth: 1
        }]
    };


    if (myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('grafico1').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Município'
                    },
                    ticks: {
                        font: {
                            family: 'Montserrat, Arial, Helvetica, sans-serif',
                            size: 14
                        }
                    }
                },
                x: {
                    beginAtZero: true,
                    display: true,
                    title: {
                        display: true,
                        text: `Cobertura de ${coberturaChart} (%)`
                    },
                    ticks: {
                        font: {
                            family: 'Montserrat, Arial, Helvetica, sans-serif',
                            size: 14
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    display: true,
                    labels: {
                        generateLabels: function (chart) {
                            return [
                                {
                                    text: 'Abaixo do limite',
                                    fillStyle: 'rgb(241, 57, 57)',
                                    strokeStyle: 'rgb(241, 57, 57)',
                                    lineWidth: 2
                                },
                                {
                                    text: 'Acima do limite',
                                    fillStyle: 'rgb(6, 204, 57)',
                                    strokeStyle: 'rgb(6, 204, 57)',
                                    lineWidth: 2
                                },
                                {
                                    text: 'Meta Marco Legal',
                                    fillStyle: 'rgb(255, 106, 0)',
                                    strokeStyle: 'rgb(255, 106, 0)',
                                    lineWidth: 2
                                }
                            ];
                        }
                    }
                },
                annotation: {
                    annotations: {
                        linhaLimite: {
                            type: 'line',
                            xMin: limite, // Valor no eixo X - da linha vermelha limite
                            xMax: limite, // Valor no eixo X - da linha vermelha limite
                            borderColor: 'rgb(255, 106, 0)', // Cor da linha
                            borderWidth: 2, // Largura da linha
                            label: {
                                content: 'Limite',
                                enabled: true,
                                position: 'end',
                                backgroundColor: 'rgb(255, 106, 0)',
                                font: {
                                    size: 12
                                }
                            }
                        }
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 4
                }
            }
        }
    });
};

async function atualizarDadosGraficoMarcoLegal() {
    let arrayMaisCriticos = await getMaisCriticos();

    primeiroMaisCritico = arrayMaisCriticos[0];
    segundoMaisCritico = arrayMaisCriticos[1];
    terceiroMaisCritico = arrayMaisCriticos[2];
    quartoMaisCritico = arrayMaisCriticos[3];
    quintoMaisCritico = arrayMaisCriticos[4];

    labels = arrayMaisCriticos.map(municipio => municipio.nome);
    valores = arrayMaisCriticos.map(valores => valores.populacaoSemAgua);
    cores = valores.map(valor => valor > limite ? 'rgb(6, 204, 57)' : 'rgb(241, 57, 57)');

    data = valores;

    console.log(labels, valores);

    myChart.data.labels = labels;
    myChart.data.datasets[0].data = valores;
    myChart.data.datasets[0].backgroundColor = cores;
    myChart.options.plugins.annotation.annotations.linhaLimite.xMin = limite;
    myChart.options.plugins.annotation.annotations.linhaLimite.xMax = limite;
    myChart.options.scales.x.title.text = `Cobertura de ${coberturaChart} (%)`;
    myChart.update();
}



    // plotGraficoMarcoLegal();

    // async function plotMaisCriticosSemAguaGeral() {
    //     console.log('entrando plotMaisCriticosSemAguaGeral');

    //     try {
    //         const semAguaMaisCriticos = await fetchMunicipiosMaisCriticos("semAgua", "geral", "maisAfetado");
    //         console.log(semAguaMaisCriticos);
    //         return semAguaMaisCriticos;
    //     } catch (error) {
    //         console.error('Error Plotting Mais Críticos Sem Agua:', error);
    //     }
    // }

    // async function fetchMunicipiosMaisCriticos(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado) {
    //     reqURL = `/municipiosMaisCriticos?categoriaSaneamento=${categoriaSaneamento}&porteMunicipio=${porteMunicipio}&menosOuMaisAfetado=${menosOuMaisAfetado}`;

    //     console.log("ESTOU fetchMunicipiosMaisCriticos");

    //     return fetch(reqURL)
    //         .then(async response => {
    //             if (!response.ok) {
    //                 throw new Error('Error in getMunicipios');
    //             }

    //             console.log(response.json());
    //             return await response.json();
    //         })
    //         .catch(error => {
    //             console.error('Fetch error:', error);
    //         })
    // }
})