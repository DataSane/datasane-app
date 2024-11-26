document.addEventListener("DOMContentLoaded", function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const dashboardEndpoint = '/api/dashboard';

    const url = `${actualIP}${dashboardEndpoint}`;

    plotPizzaGraphics();

    async function getQtdMunicipiosAcimaAbaixo(categoriaSaneamento) {
        let reqUrl = `${url}/cobertura`;

        console.log(reqUrl);

        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoriaSaneamento: categoriaSaneamento
            })
        });

        if (!response.ok) {
            throw new Error('Error in getQtdMunicipiosAcimaAbaixo');
        }

        let object = await response.json();
        console.log(object);
        return object;
    }

    getQtdMunicipiosAcimaAbaixo();

    async function tratativaDadosPizza() {
        const totalMunicipios = 645;

        const municipiosAcimaAbaixo = await getQtdMunicipiosAcimaAbaixo();
        const municipiosAcima = (municipiosAcimaAbaixo.acima * totalMunicipios) / 100;
        const municipiosAbaixo = (municipiosAcimaAbaixo.abaixo * totalMunicipios) / 100;


    }

    async function plotPizzaGraphics() {
        let labels;
        let data;
        let backgroundColor;

        let dataPizza = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor
            }]
        };

        for (table = 1; table <= 4; table++) {
            switch (table) {
                case 1:
                    labels = ['Acima 90,9%', 'Abaixo 90,9%'];
                    data = 
                    backgroundColor = ['rgb(15, 80, 150)', 'rgb(96, 130, 182)'];
                    break;
                case 2:
                    labels = ['Acima 95,7%', 'Abaixo 95,7%'];
                    backgroundColor = ['rgb(50, 150, 50)', 'rgb(90, 200, 90)'];
                    break;
                case 3:
                    labels = ['Acima 80,9%', 'Abaixo 80,9%'];
                    backgroundColor = ['rgb(140, 110, 85) ', 'rgb(174, 140, 112) '];
                    break;
                case 4:
                    labels = ['Acima 86,8%', 'Abaixo 86,8%'];
                    backgroundColor = ['rgb(255, 140, 0)', 'rgb(255, 180, 50)'];
                    break;
            }

            createPieChart(document.getElementById('graficoPizza${table}').getContext('2d'), dataPizza);
        }
    }

    // Função para criar gráficos de pizza com a fonte personalizada
    // Função para criar gráficos de pizza com a fonte personalizada e exibir valores
    function createPieChart(ctx, data) {
        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Montserrat, Arial, Helvetica, sans-serif' // Fonte personalizada na legenda do gráfico de pizza
                            }
                        }
                    },
                    datalabels: { // Configuração do plugin datalabels
                        color: '#ffffff', // Cor do texto
                        font: {
                            family: 'Montserrat, Arial, Helvetica, sans-serif',
                            size: 14
                        },
                        formatter: (value, ctx) => {
                            return value; // Exibe o valor diretamente
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // Ativação do plugin datalabels
        });
    }
});