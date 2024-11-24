var dashboardModel = require('../models/dashboardModel');

function getMunicipiosMaisCriticos(req, res, categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, qtdMunicipios) {
    try {
        const municipiosMaisCriticos = dashboardModel.municipiosMaisCriticos(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, qtdMunicipios);
        return municipiosMaisCriticos;
    } catch {
        console.error("Error trying to catch most critical Municipio");
        throw err;
    }
}

module.exports = { getMunicipiosMaisCriticos };