document.addEventListener('DOMContentLoaded', function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const municipiosEndpoint = '/api/municipios';
    
    const url = `${actualIP}${municipiosEndpoint}`;

    async function fetchAndLogMunicipios() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error in getMunicipios');
            }
            const municipios = await response.json();
            console.log(municipios);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    fetchAndLogMunicipios();
});