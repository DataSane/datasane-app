var dashboardModel = require('../models/dashboardModel');

function getMunicipiosMaisCriticos(req, res) {
    const categoriaSaneamento = req.body.categoriaSaneamento;
    const porteMunicipio = req.body.porteMunicipio;
    const menosOuMaisAfetado = req.body.menosOuMaisAfetado;
        
    dashboardModel.municipiosMaisCriticos(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado).then(function (data) {
        res.status(200).json(data);
    }).catch(function (err) {
        console.error("Error trying to get most critical Municipios");
        res.status(500).json({ error: 'Error retrieving most critical Municipios' });
    });
}

function getQtdAcimaAbaixoCobertura() {
    return dashboardModel.qtdAcimaAbaixoCobertura();
}

module.exports = { getMunicipiosMaisCriticos, getQtdAcimaAbaixoCobertura };