var municipiosModel = require('../models/municipiosModel');

async function getMunicipios(porteMunicipio) {
    try {
        const municipios = await municipiosModel.municipios(porteMunicipio); // Pela quantidade de dados, necessário utilização de await e async
        return municipios;
    } catch (err) {
        console.error('Error trying to catch Municípios:', err);
        throw err;
    }
}

async function getMunicipiosFiltered(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado) {
    const filteredMunicipios = await municipiosModel.filteredMunicipios(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado);
    return filteredMunicipios;
}

async function getMunicipioById(id){
    const municipio = await municipiosModel.findMunicipioById(id);
    return municipio;
}
module.exports = { getMunicipios, getMunicipiosFiltered, getMunicipioById };