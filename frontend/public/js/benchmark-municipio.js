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

            const option2 = document.createElement('option');
            option2.value = municipio.nome;

            datalist1.appendChild(option1);
            datalist2.appendChild(option2);
        });
    }

    fetchAndRenderMunicipios();
});