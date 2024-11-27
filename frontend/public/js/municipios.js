document.addEventListener('DOMContentLoaded', function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const municipiosEndpoint = '/api/municipios';

    const url = `${actualIP}${municipiosEndpoint}`;

    console.log('entrando fetch');
    fetchMunicipios();
    plotMunicipios();

    function verificarCategoria() {
        let categoriaSelecionada = selectCategoria.value;
        
        limite = 10;

        if (categoriaSelecionada == "agua_value") {
            categoriaSaneamento = "semAgua";
            categoriaSaneamentoMunicipio = "populacaoSemAgua";
            coberturaChart = "Água";
            limite = 1;
        } else if (categoriaSelecionada == "esgoto_value") {
            categoriaSaneamento = "semEsgoto";
            categoriaSaneamentoMunicipio = "populacaoSemEsgoto";
            coberturaChart = "Tratamento de Esgoto";
        } else if (categoriaSelecionada == "lixo_value") {
            categoriaSaneamento = "semLixo";
            categoriaSaneamentoMunicipio = "populacaoSemLixo";
            coberturaChart = "Coleta de Lixo";
        }
    }

    function fetchMunicipios() {
        return fetch(url)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Error in getMunicipios');
                }

                return await response.json();
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    async function plotMunicipios() {
        console.log('entrando plotMunicipios');

        try {
            const tableBody = document.getElementById('table-body');
            const municipios = await fetchMunicipios();

            municipios.forEach(municipio => {
                const row = document.createElement('tr');

                const nomeCell = document.createElement('td');
                nomeCell.textContent = municipio.nome;
                row.appendChild(nomeCell);

                const populacaoCell = document.createElement('td');
                populacaoCell.textContent = municipio.populacaoTotal;
                row.appendChild(populacaoCell);

                const semLixoCell = document.createElement('td');
                semLixoCell.textContent = municipio.populacaoSemLixo + '%';
                row.appendChild(semLixoCell);

                const semAguaCell = document.createElement('td');
                semAguaCell.textContent = municipio.populacaoSemAgua + '%';
                row.appendChild(semAguaCell);

                const semEsgotoCell = document.createElement('td');
                semEsgotoCell.textContent = municipio.populacaoSemEsgoto + '%';
                row.appendChild(semEsgotoCell);

                const sujeitoInundacoes = document.createElement('td');
                sujeitoInundacoes.textContent = municipio.domicilioSujeitoInundacoes + '%';
                row.appendChild(sujeitoInundacoes);

                const planoMunicipal = document.createElement('td');
                planoMunicipal.textContent = municipio.possuiPlanoMunicipal;
                row.appendChild(planoMunicipal);

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error Plotting Municipios:', error);
        }
    }

});