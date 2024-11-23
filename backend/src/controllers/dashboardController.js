var dashboardModel = require('../models/dashboardModel');

function getMunicipioMaisCritico(req, res, categoriaSaneamento, porteMunicipio, ordemLista, qtdMunicipios) {
    try {
        const municipioMaisCritico = dashboardModel.municipioMaisCritico(categoriaSaneamento, porteMunicipio, ordemLista, qtdMunicipios);
        return municipioMaisCritico;
    } catch {
        console.error("Error trying to catch most critical Municipio");
        throw err;
    }
}

module.exports = { getMunicipioMaisCritico };