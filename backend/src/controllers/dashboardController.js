var dashboardModel = require('../models/dashboardModel');

function getMunicipioMaisCritico(req, res, porteMunicipio, ordemLista) {
    try {
        const municipioMaisCritico = dashboardModel.municipioMaisCritico(porteMunicipio, ordemLista);
        return municipioMaisCritico;
    } catch {
        console.error("Error trying to catch most critical Municipio");
        throw err;
    }
}

module.exports = { getMunicipioMaisCritico };