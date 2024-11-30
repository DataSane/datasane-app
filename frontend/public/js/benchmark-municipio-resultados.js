const titleComparative = document.querySelector("#title-comparative")

document.addEventListener('DOMContentLoaded', function() {
    console.log("Município 1 ID:", window.municipio1Id);
    console.log("Município 2 ID:", window.municipio2Id);

    async function fetchMunicipioData(id) {
        const response = await fetch(`/api/municipios/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for município ID ${id}`);
        }
        return response.json();
    }

    async function fetchAndDisplayMunicipiosData() {
        try {
            const municipio1Data = await fetchMunicipioData(window.municipio1Id);
            const municipio2Data = await fetchMunicipioData(window.municipio2Id);

            titleComparative.innerHTML = `Comparativo da falta de Cobertura de Abastecimento de Água, Tratamento de Esgoto, Coleta de Lixo e Vulnerabilidade à Inundação entre ${municipio1Data.nome} e ${municipio2Data.nome}`

            console.log(municipio1Data, municipio2Data)

            m1nome = municipio1Data.nome;
            // m1popTotal = municipio1Data.populacaoTotal;
            // m1semAgua = Math.round(m1popTotal * (parseFloat(municipio1Data.populacaoSemAgua) / 100));
            // m1semEsgoto = Math.round(m1popTotal * (parseFloat(municipio1Data.populacaoSemEsgoto) / 100));
            // m1semColeta = Math.round(m1popTotal * (parseFloat(municipio1Data.populacaoSemLixo) / 100));
            m1semAgua = municipio1Data.populacaoSemAgua;
            m1semEsgoto = municipio1Data.populacaoSemEsgoto;
            m1semColeta = municipio1Data.populacaoSemLixo;
            m1sujeitoInundacao = municipio1Data.domicilioSujeitoInundacoes;

            // m1intersecao = Math.round(m1popTotal * 
            //     (parseFloat(municipio1Data.populacaoSemAgua) / 100) * 
            //     (parseFloat(municipio1Data.populacaoSemEsgoto) / 100) * 
            //     (parseFloat(municipio1Data.populacaoSemLixo) / 100));

            // console.log(`Interseção Município 1 (${m1nome}): ${m1intersecao}`);

            m2nome = municipio2Data.nome;
            // m2popTotal = municipio2Data.populacaoTotal;
            // // m2semAgua = Math.round(m2popTotal * (parseFloat(municipio2Data.populacaoSemAgua) / 100));
            // // m2semEsgoto = Math.round(m2popTotal * (parseFloat(municipio2Data.populacaoSemEsgoto) / 100));
            // // m2semColeta = Math.round(m2popTotal * (parseFloat(municipio2Data.populacaoSemLixo) / 100));
            m2semAgua = municipio2Data.populacaoSemAgua;
            m2semEsgoto = municipio2Data.populacaoSemEsgoto;
            m2semColeta = municipio2Data.populacaoSemLixo;
            m2sujeitoInundacao = municipio2Data.domicilioSujeitoInundacoes;


            // m2intersecao = Math.round(m2popTotal * 
            //     (parseFloat(municipio2Data.populacaoSemAgua) / 100) * 
            //     (parseFloat(municipio2Data.populacaoSemEsgoto) / 100) * 
            //     (parseFloat(municipio2Data.populacaoSemLixo) / 100));

            // console.log(`Interseção Município 2 (${m2nome}): ${m2intersecao}`);

            var comparativeChart = document.querySelector('#comparativeChart');
            var ctx = document.getElementById('comparativeChart').getContext('2d');
            comparativeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sem Água', 'Sem Esgoto', 'Sem Coleta de Lixo', 'Domicilios Sujeitos a Inundação'],
                datasets: [
                    {
                        label: m1nome,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: [m1semAgua, m1semEsgoto, m1semColeta, m1sujeitoInundacao], 
                    },
                    {
                        label: m2nome,
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        data: [m2semAgua, m2semEsgoto, m2semColeta, m2sujeitoInundacao],
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 100, // Limita o eixo Y a 100
                        suggestedMax: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';  // Formata os valores como porcentagem
                            },
                            stepSize: 10, // Define o intervalo de marcação no eixo Y
                            min: 0,
                            max: 100,
                        },
                    }
                },
                plugins: {
                    legend:{
                        position: 'bottom'
                    }
                }
            }
        });
            } catch (error) {
                console.error('Error fetching municipality data:', error);
            }
        }

    fetchAndDisplayMunicipiosData();
});