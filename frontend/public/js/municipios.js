document.addEventListener('DOMContentLoaded', function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const municipiosEndpoint = '/api/municipios';

    const url = `${actualIP}${municipiosEndpoint}`;

    let selectCategoria = document.querySelector("#selectCategoria");
    let selectPorteMunicipio = document.querySelector("#selectPorteMunicipio");
    let selectMenosOuMaisSelecionado = document.querySelector("#selectMenosOuMais");
    let categoriaSaneamento;
    let porteMunicipio;
    let menosOuMaisAfetado;
    let categoriaSaneamentoMunicipio;
    let semFiltro;

    verficarValores();

    function verficarValores() {
        let menosOuMaisSelecionado = selectMenosOuMaisSelecionado.value;
        let categoriaSelecionada = selectCategoria.value;
        console.log(menosOuMaisSelecionado, categoriaSelecionada)

        semFiltro = false;

        if (categoriaSelecionada == 'semFiltro_value' && menosOuMaisSelecionado == 'semFiltro_value') {
            semFiltro = true;
        } else if (categoriaSelecionada == 'semFiltro_value') {
            categoriaSelecionada = 'agua_value';
            selectCategoria.value = 'agua_value';
        } else if (menosOuMaisSelecionado == 'semFiltro_value') {
            menosOuMaisSelecionado = 'menosAfetado_value';
            selectMenosOuMaisSelecionado.value = 'menosAfetado_value';
        }


        verificarCategoria(categoriaSelecionada);
        verificarMenosOuMaisAfetados(menosOuMaisSelecionado);
        verificarPorteMunicipio();
        plotMunicipios();
    }
    
    selectCategoria.addEventListener("change", function () {
        verficarValores();
    });

    selectPorteMunicipio.addEventListener("change", function () {
        verficarValores();
    });

    selectMenosOuMaisSelecionado.addEventListener("change", function () {
        verficarValores();
    });

    clearFiltroButton.addEventListener("onclick", () => {
        selectCategoria.value = 'semFiltro_value'
        selectMenosOuMaisSelecionado.value = 'semFiltro_value'
        selectPorteMunicipio.value = 'geral_value'
    })

    function verificarCategoria(categoriaSelecionada) {
        if (categoriaSelecionada == "agua_value") {
            categoriaSaneamento = "semAgua";
            categoriaSaneamentoMunicipio = "populacaoSemAgua";
            coberturaChart = "Água";
        } else if (categoriaSelecionada == "esgoto_value") {
            categoriaSaneamento = "semEsgoto";
            categoriaSaneamentoMunicipio = "populacaoSemEsgoto";
            coberturaChart = "Tratamento de Esgoto";
        } else if (categoriaSelecionada == "lixo_value") {
            categoriaSaneamento = "semLixo";
            categoriaSaneamentoMunicipio = "populacaoSemLixo";
            coberturaChart = "Coleta de Lixo";
        } else {
            console.error('Invalid categoriaSaneamento. Please use "semLixo", "semAgua", "populacaoSemEsgoto" or "inundacao".');
            return;
        }

        console.log("Categoria: " + categoriaSaneamento, categoriaSaneamentoMunicipio);
    }

    function verificarPorteMunicipio() {
        let porteSelecionado = selectPorteMunicipio.value;

        console.log("Select PorteMunicipio: " + selectPorteMunicipio.value);

        if (porteSelecionado == "grande_value") {
            porteMunicipio = "grande";
        } else if (porteSelecionado == "medio_value") {
            porteMunicipio = "medio";
        } else if (porteSelecionado == "pequeno_value") {
            porteMunicipio = "pequeno";
        } else if (porteSelecionado == "geral_value") {
            porteMunicipio = "geral";
        }

        console.log("Porte Municipio: " + porteMunicipio);
    }

    function verificarMenosOuMaisAfetados(menosOuMaisSelecionado) {
        if (menosOuMaisSelecionado == "maisAfetado_value") {
            menosOuMaisAfetado = "maisAfetado";
        } else if (menosOuMaisSelecionado == "menosAfetado_value") {
            menosOuMaisAfetado = "menosAfetado";
        } else {
            menosOuMaisAfetado = undefined;
        }

        console.log("Menos ou Mais Afetado: " + menosOuMaisAfetado);
    }

    async function fetchMunicipios() {
        try {

            
            const params = semFiltro ? new URLSearchParams({porteSelecionado: porteMunicipio}) : new URLSearchParams({categoriaSaneamento: categoriaSaneamento, porteSelecionado: porteMunicipio, menosOuMaisAfetados: menosOuMaisAfetado});

            const filtersUrl = "/api/municipios/filters";
            const withoutFiltersUrl = "/api/municipios/withoutFilters";
            const reqUrl = semFiltro ? `${municipiosEndpoint}?${params.toString()}` : `${filtersUrl}?${params.toString()}`;

            console.log(reqUrl);

            const response = await fetch(reqUrl);

            if (!response.ok) {
                throw new Error('Error in getMunicipios');
            }

            const data = await response.json();
            console.log(data);
            return data;

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async function plotMunicipios() {
        console.log('entrando plotMunicipios');

        try {
            let tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ""; 

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

function downloadRelatorio() {
   var table = document.getElementById('tableRelatorio');  // Substitua 'myTable' pelo id da sua tabela
   // Converter tabela HTML para planilha Excel
   var wb = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
   
   // Baixar a planilha como arquivo Excel
   XLSX.writeFile(wb, 'Relatorio.xlsx');
}