document.addEventListener('DOMContentLoaded', function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const dashboardEndpoint = '/api/dashboard';

    const url = `${actualIP}${dashboardEndpoint}`;

    function fetchMunicipiosMaisCriticos() {

        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error in getMunicipios');
                }

                console.log(response.json());
                return response.json();
            })
            .catch(error => {
                console.error('Fetch error:', error);
            })
    }

    console.log('entrando fetch municipio mais crítico');
    fetchMunicipiosMaisCriticos();

    function plotMaisCriticosSemAgua() {
        console.log('entrando plotMaisCriticosSemAgua');

        try {
            const semAguaMaisCriticos = await fetchMunicipiosMaisCriticos();

        } catch (error) {
            console.error('Error Plotting Mais Críticos Sem Agua:', error);
        }
    })