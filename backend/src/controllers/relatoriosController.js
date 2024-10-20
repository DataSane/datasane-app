var relatoriosModel = require('../models/relatoriosModel');

function getMunicipios(req, res) {
    relatoriosModel.municipios()
       .then((getMunicipios) => {
            console.log(getMunicipios[0]);
            res.json(getMunicipios);
        })
       .catch((err) => {
            console.error(err);
            res.status(500).send('Erro ao buscar municípios');
        });
}

module.exports = {getMunicipios};