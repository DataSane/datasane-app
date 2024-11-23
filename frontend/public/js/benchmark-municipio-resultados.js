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

            m1nome = municipio1Data.nome;
            m1popTotal = municipio1Data.populacaoTotal;
            m1semAgua = Math.round(m1popTotal * (parseFloat(municipio1Data.populacaoSemAgua) / 100));
            m1semEsgoto = Math.round(m1popTotal * (parseFloat(municipio1Data.populacaoSemEsgoto) / 100));
            m1semColeta = Math.round(m1popTotal * (parseFloat(municipio1Data.populacaoSemLixo) / 100));

            m1intersecao = Math.round(m1popTotal * 
                (parseFloat(municipio1Data.populacaoSemAgua) / 100) * 
                (parseFloat(municipio1Data.populacaoSemEsgoto) / 100) * 
                (parseFloat(municipio1Data.populacaoSemLixo) / 100));

            console.log(`Interseção Município 1 (${m1nome}): ${m1intersecao}`);

            m2nome = municipio2Data.nome;
            m2popTotal = municipio2Data.populacaoTotal;
            m2semAgua = Math.round(m2popTotal * (parseFloat(municipio2Data.populacaoSemAgua) / 100));
            m2semEsgoto = Math.round(m2popTotal * (parseFloat(municipio2Data.populacaoSemEsgoto) / 100));
            m2semColeta = Math.round(m2popTotal * (parseFloat(municipio2Data.populacaoSemLixo) / 100));

            m2intersecao = Math.round(m2popTotal * 
                (parseFloat(municipio2Data.populacaoSemAgua) / 100) * 
                (parseFloat(municipio2Data.populacaoSemEsgoto) / 100) * 
                (parseFloat(municipio2Data.populacaoSemLixo) / 100));

            console.log(`Interseção Município 2 (${m2nome}): ${m2intersecao}`);

            var comparativeChart = document.querySelector('#comparativeChart');
            var ctx = document.getElementById('comparativeChart').getContext('2d');
            comparativeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Interseção','Água', 'Esgoto', 'Coleta de Lixo'],
                datasets: [
                    {
                        label: m1nome,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: [m1intersecao, m1semAgua, m1semEsgoto, m1semColeta], 
                    },
                    {
                        label: m2nome,
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        data: [m2intersecao, m2semAgua, m2semEsgoto, m2semColeta],
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'TEST'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                legend:{
                    position: 'bottom'
                }
            }
        });
            } catch (error) {
                console.error('Error fetching municipality data:', error);
            }
        }

    fetchAndDisplayMunicipiosData();
});