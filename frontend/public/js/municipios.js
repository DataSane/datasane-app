document.addEventListener('DOMContentLoaded', function () {
    const url = 'http://localhost:3333/api/municipios';

    function fetchMunicipios() {
        console.log('estou no fetch');
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error in getMunicipios');
                }
                
                console.log('estou retornando JSON');
                return response.json();
            })
            .then(municipios => {
                console.log('1ª linha:', municipios[0]);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

        console.log('saindo do fetch');
    }
    
    console.log('entrando fetch');
    fetchMunicipios();
    
    // function plotMunicipios(municipios) {
    //     const titulos = document.getElementsByName('th');


    // }
});