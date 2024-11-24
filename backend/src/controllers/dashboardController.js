var dashboardModel = require('../models/dashboardModel');

function getMunicipiosMaisCriticos(req, res) {
    const categoriaSaneamento = req.body.categoriaSaneamento;
    const porteMunicipio = req.body.porteMunicipio;
    const menosOuMaisAfetado = req.body.menosOuMaisAfetado;

    console.log("ATRIBUTOS: " + categoriaSaneamento, porteMunicipio, menosOuMaisAfetado);
        
    dashboardModel.municipiosMaisCriticos(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado).then(function (data) {
        res.status(200).json(data);
    }).catch(function (err) {
        console.error("Error trying to get most critical Municipios");
        res.status(500).json({ error: 'Error retrieving most critical Municipios' });
    });

    // try {
    //     const municipiosMaisCriticos = await dashboardModel.municipiosMaisCriticos(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, qtdMunicipios);
    //     return municipiosMaisCriticos;
    // } catch (err) {
    //     console.error("Error trying to catch most critical Municipio");
    //     throw err;
    // }
}

module.exports = { getMunicipiosMaisCriticos };