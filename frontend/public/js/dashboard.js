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

    verificarCategoria();
    verificarPorteMunicipio();
    verificarMenosOuMaisAfetados();
    getMaisCriticos();
    atualizarDadosGraficoMarcoLegal();
    plotarGraficoMarcoLegal();

    function verificarCategoria() {
        let categoriaSelecionada = selectCategoria.value;

        if (categoriaSelecionada == "agua_value") {
            categoriaSaneamento = "semAgua";
        } else if (categoriaSelecionada == "esgoto_value") {
            categoriaSaneamento = "semEsgoto";
        } else if (categoriaSelecionada == "lixo_value") {
            categoriaSaneamento = "semLixo";
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

    selectCategoria.addEventListener("change", async function () {
        verificarCategoria();
        atualizarDadosGraficoMarcoLegal();
    });

    function getMaisCriticos() {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoriaSaneamento: categoriaSaneamento,
                porteMunicipio: porteMunicipio,
                menosOuMaisAfetado: menosOuMaisAfetado
            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error('Error in getMaisCriticos');
            }

            return await response.json();
        });
    }

    async function plotarGraficoMarcoLegal() {
        let arrayMaisCriticos = await getMaisCriticos();

        primeiroMaisCritico = arrayMaisCriticos[0];
        segundoMaisCritico = arrayMaisCriticos[1];
        terceiroMaisCritico = arrayMaisCriticos[2];
        quartoMaisCritico = arrayMaisCriticos[3];
        quintoMaisCritico = arrayMaisCriticos[4];

        labels = [primeiroMaisCritico.nome, segundoMaisCritico.nome, terceiroMaisCritico.nome, quartoMaisCritico.nome, quintoMaisCritico.nome];
        valores = [primeiroMaisCritico.populacaoSemAgua, segundoMaisCritico.populacaoSemAgua, terceiroMaisCritico.populacaoSemAgua, quartoMaisCritico.populacaoSemAgua, quintoMaisCritico.populacaoSemAgua];
        limite = 99;
        cores = valores.map(valor => valor > limite ? 'rgb(6, 204, 57)' : 'rgb(241, 57, 57)');

        data = {
            labels: labels,
            datasets: [{
                axis: 'y',
                label: 'Cobertura município',
                data: [valores[0], valores[1], valores[2], valores[3], valores[4]],
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
                            text: 'Porcentagem (%)'
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
                                        text: 'Meta Sinis',
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
                                xMin: 99, // Valor no eixo X - da linha vermelha limte
                                xMax: 99, // Valor no eixo X - da linha vermelha limte
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

        labels = [primeiroMaisCritico.nome, segundoMaisCritico.nome, terceiroMaisCritico.nome, quartoMaisCritico.nome, quintoMaisCritico.nome];
        valores = [primeiroMaisCritico.populacaoSemAgua, segundoMaisCritico.populacaoSemAgua, terceiroMaisCritico.populacaoSemAgua, quartoMaisCritico.populacaoSemAgua, quintoMaisCritico.populacaoSemAgua];
        limite = 99;
        cores = valores.map(valor => valor > limite ? 'rgb(6, 204, 57)' : 'rgb(241, 57, 57)');

        data = [valores[0], valores[1], valores[2], valores[3], valores[4]];

        atualizarChartData(labels, data);
    }

    function atualizarChartData(newLabels, newData) {
        myChart.data.labels = newLabels;
        myChart.data.datasets[0].data = newData;
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