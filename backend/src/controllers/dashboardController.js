var dashboardModel = require('../models/dashboardModel');

function getMunicipioMaisCritico(req, res, tipoMunicipio) {
    try {
        const municipioMaisCritico = dashboardModel.municipioMaisCritico(tipoMunicipio);
        return municipioMaisCritico;
    } catch {
        console.error("Error trying to catch most critical Municipio");
        throw err;
    }
}

module.exports = { getMunicipioMaisCritico };