document.addEventListener("DOMContentLoaded", function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const dashboardEndpoint = '/api/dashboard';

    const url = `${actualIP}${dashboardEndpoint}`;

    plotPizzaGraphics();

    async function plotPizzaGraphics() {
        let dataPizza;
        let labels;
        let data;
        let backgroundColor;
        let municipios;
        let categoriaSaneamento;
        let porcentagemSnis;
        let primeiroBackground;
        let segundoBackground;
        let ctx;

        
        for (table = 1; table <= 4; table++) {
            switch (table) {
                case 1:
                    categoriaSaneamento = "semAgua";
                    porcentagemSnis = "90,9";
                    primeiroBackground = "rgb(15, 80, 150)";
                    segundoBackground = "rgb(96, 130, 182)";
                    break;
                case 2:
                    categoriaSaneamento = "semLixo";
                    porcentagemSnis = "95,7";
                    primeiroBackground = "rgb(50, 150, 50)";
                    segundoBackground = "rgb(90, 200, 90)";
                    break;
                case 3:
                    categoriaSaneamento = "semEsgoto";
                    porcentagemSnis = "80,9";
                    primeiroBackground = "rgb(140, 110, 85)";
                    segundoBackground = "rgb(174, 140, 112)";
                    break;
                case 4:
                    categoriaSaneamento = "inundacao";
                    porcentagemSnis = "86,8";
                    primeiroBackground = "rgb(255, 140, 0)";
                    segundoBackground = "rgb(255, 180, 50)";
                    break;
            }

            
            municipios = await tratativaDadosPizza(categoriaSaneamento);
            labels = [`Acima ${porcentagemSnis}%`, `Abaixo ${porcentagemSnis}%`];
            backgroundColor = [`${primeiroBackground}`, `${segundoBackground}`];
            data = [municipios.municipiosAcima, municipios.municipiosAbaixo];
            ctx = document.getElementById(`graficoPizza${table}`).getContext('2d');
            
            dataPizza = {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColor
                }]
            };
    
            createPieChart(ctx, dataPizza);
        }
    }

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

        return await response.json();
    }

    async function tratativaDadosPizza(categoriaSaneamento) {
        const totalMunicipios = 645;

        const municipiosAcimaAbaixo = await getQtdMunicipiosAcimaAbaixo(categoriaSaneamento);
        console.log(municipiosAcimaAbaixo);
        
        const municipiosAcima = parseFloat((municipiosAcimaAbaixo.resultAcima[0].acima * 100) / totalMunicipios).toFixed(2);
        const municipiosAbaixo = parseFloat((municipiosAcimaAbaixo.resultAbaixo[0].abaixo * 100) / totalMunicipios).toFixed(2);
        
        console.log(municipiosAbaixo, municipiosAcima);

        return {
            municipiosAcima,
            municipiosAbaixo
        };
    }

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
                                family: 'Montserrat, Arial, Helvetica, sans-serif'
                            }
                        }
                    },
                    datalabels: {
                        color: '#ffffff',
                        font: {
                            family: 'Montserrat, Arial, Helvetica, sans-serif',
                            size: 14
                        },
                        formatter: (value, ctx) => {
                            return value;
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }
});