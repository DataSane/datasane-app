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

function getQtdAcimaEAbaixoCobertura(req, res) {
    const categoriaSaneamento = req.body.categoriaSaneamento;
    
    dashboardModel.qtdAcimaEAbaixoCobertura(categoriaSaneamento).then(function (data) {
        res.status(200).json(data);
    }).catch(function (err) {
        console.error("Error trying to get number of cities above and below coverage");
        res.status(500).json({ error: 'Error retrieving number of cities above and below coverage' });
    });
}

module.exports = { getMunicipiosMaisCriticos, getQtdAcimaEAbaixoCobertura };