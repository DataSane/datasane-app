document.addEventListener('DOMContentLoaded', function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const municipiosEndpoint = '/api/municipios';
    
    const url = `${actualIP}${municipiosEndpoint}`;

    async function fetchAndRenderMunicipios() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error in getMunicipios');
            }
            const municipios = await response.json();
            renderMunicipiosInDatalists(municipios);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function renderMunicipiosInDatalists(municipios) {
        const datalist1 = document.getElementById('municipio1');
        const datalist2 = document.getElementById('municipio2');

        municipios.forEach(municipio => {
            const option1 = document.createElement('option');
            option1.value = municipio.nome; 
            option1.dataset.id = municipio.idMunicipio; 

            const option2 = document.createElement('option');
            option2.value = municipio.nome;
            option2.dataset.id = municipio.idMunicipio;

            datalist1.appendChild(option1);
            datalist2.appendChild(option2);
        });
    }

    function getSelectedMunicipioId(inputElement, datalistId) {
        const datalist = document.getElementById(datalistId);
        const selectedOption = Array.from(datalist.options).find(option => option.value === inputElement.value);
        return selectedOption ? selectedOption.dataset.id : null;
    }

    function updateBenchmarkLink() {
        const input1 = document.getElementById('inputMunicipio1');
        const input2 = document.getElementById('inputMunicipio2');
        const id1 = getSelectedMunicipioId(input1, 'municipio1');
        const id2 = getSelectedMunicipioId(input2, 'municipio2');

        if (id1 && id2) {
            benchmarkLink.href = `/municipios/comparativa/resultados?id1=${id1}&id2=${id2}`;
        } else {
            benchmarkLink.href = '#';
        }
    }

    const benchmarkLink = document.getElementById('benchmarkLink');
    document.getElementById('inputMunicipio1').addEventListener('change', updateBenchmarkLink);
    document.getElementById('inputMunicipio2').addEventListener('change', updateBenchmarkLink);

    fetchAndRenderMunicipios();
});