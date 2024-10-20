document.addEventListener('DOMContentLoaded', function () {
    const url = 'http://localhost:3333/relatorios';

    function fetchMunicipios() {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error in getMunicipios');
                }

                return response.json();
            })
            .then(municipios => {
                console.log('1ª linha:', municipios[0]);
            })
    }
    
    fetchMunicipios();

    // function plotMunicipios(municipios) {
    //     const titulos = document.getElementsByName('th');


    // }
});