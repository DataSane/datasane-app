var municipiosModel = require('../models/municipiosModel');

async function getMunicipios(req, res) {
    try {
        const municipios = await municipiosModel.municipios();
        return municipios; // Retorna os dados para quem chamou
    } catch (err) {
        console.error('Erro ao buscar municípios:', err);
        throw err; // Lança o erro para ser tratado na rota
    }
}

module.exports = { getMunicipios };