document.addEventListener("DOMContentLoaded", function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const dashboardEndpoint = '/api/dashboard';

    const url = `${actualIP}${dashboardEndpoint}`;

    async function getCobertura(categoriaSaneamento) {
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
            throw new Error('Error in getCobertura');
        }

        return await response.json();
    }

    getCobertura();

    async function plotPizzaGraphics() {
        let labels;
        let data;
        let backgroundColor;

        for (table = 1; table <= 4; table++) {
            switch (table) {
                case 1:
                    labels = ['Acima 90,9%', 'Abaixo 90,9%'];
                    data = 
                    break;
                case 2:
                    labels = ['Acima 95,7%', 'Abaixo 95,7%'];
                    break;
                case 3:
                    labels = ['Acima 80,9%', 'Abaixo 80,9%'];
                    break;
                case 4:
                    labels = ['Acima 86,8%', 'Abaixo 86,8%'];
                    break;
            }
        }

        let dataPizza = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor
            }]
        };
    }

    // Defina diferentes conjuntos de dados para cada gráfico com cores exclusivas
    const dataPizza1 = {
        labels: ['Acima 90,9%', 'Abaixo 90,9%'],
        datasets: [{
            data: [40, 60],
            backgroundColor: ['rgb(15, 80, 150)', 'rgb(96, 130, 182)']
        }]
    };

    const dataPizza2 = {
        labels: ['Acima 95,7%', 'Abaixo 95,7%'],
        datasets: [{
            data: [40, 60],
            backgroundColor: ['rgb(50, 150, 50)', 'rgb(90, 200, 90)']
        }]
    };

    const dataPizza3 = {
        labels: ['Acima 80,9%', 'Abaixo 80,9%'],
        datasets: [{
            data: [40, 60],
            backgroundColor: ['rgb(140, 110, 85) ', 'rgb(174, 140, 112) ']
        }]
    };

    const dataPizza4 = {
        labels: ['Acima 86,8%', 'Abaixo 86,8%'],
        datasets: [{
            data: [40, 60],
            backgroundColor: ['rgb(255, 140, 0)', 'rgb(255, 180, 50)']
        }]
    };

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


    // Crie os gráficos de pizza com conjuntos de dados diferentes
    createPieChart(document.getElementById('graficoPizza1').getContext('2d'), dataPizza1);
    createPieChart(document.getElementById('graficoPizza2').getContext('2d'), dataPizza2);
    createPieChart(document.getElementById('graficoPizza3').getContext('2d'), dataPizza3);
    createPieChart(document.getElementById('graficoPizza4').getContext('2d'), dataPizza4);
});