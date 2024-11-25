document.addEventListener("DOMContentLoaded", function () {
    const actualIP = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const dashboardEndpoint = '/api/dashboard';

    const url = `${actualIP}${dashboardEndpoint}`;

    async function getCobertura() {
        let reqUrl = `${url}/cobertura`;

        console.log(reqUrl);

        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoriaSaneamento: "semAgua"
            })
        });

        if (!response.ok) {
            throw new Error('Error in getCobertura');
        }

        
        return await response.json();
    }

    getCobertura();
});