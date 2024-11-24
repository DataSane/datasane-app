document.addEventListener("DOMContentLoaded", function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const dashboardEndpoint = '/api/dashboard';

    const url = `${actualIP}${dashboardEndpoint}`;

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

    async function getCobertura() {
        let municipios = await fetchMunicipios();

        
    }
});