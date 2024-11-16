var municipiosModel = require('../models/municipiosModel');

async function getMunicipios(req, res) {
    try {
        const municipios = await municipiosModel.municipios(); // Pela quantidade de dados, necessário utilização de await e async
        return municipios;
    } catch (err) {
        console.error('Error trying to catch Municípios:', err);
        throw err;
    }
}

module.exports = { getMunicipios };