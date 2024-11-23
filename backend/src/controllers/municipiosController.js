var municipiosModel = require('../models/municipiosModel');

async function getMunicipios(req, res) {
    try {
        const municipios = await municipiosModel.municipios(); // Pela quantidade de dados, necessário utilização de await e async
        return municipios;
    } catch (err) {
        console.error('Erro ao buscar municípios:', err);
        throw err;
    }
}

async function getMunicipioById(id){
    const municipio = await municipiosModel.findMunicipioById(id);
    return municipio;
}
module.exports = { getMunicipios, getMunicipioById };