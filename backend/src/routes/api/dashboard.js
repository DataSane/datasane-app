const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');

router.get('/', (req, res) => {
    const categoriaSaneamento = req.query.categoriaSaneamento;
    const porteMunicipio = req.query.porteMunicipio;
    const menosOuMaisAfetado = req.query.menosOuMaisAfetado;

    var maisCriticosSemAguaGeral = dashboardController.getMunicipiosMaisCriticos(req, res, categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, 5);
    var maisCriticosSemAguaPequeno = dashboardController.getMunicipiosMaisCriticos(req, res, categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, 5);
    var maisCriticosSemAguaMedio = dashboardController.getMunicipiosMaisCriticos(req, res, categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, 5);
    var maisCriticosSemAguaGrande = dashboardController.getMunicipiosMaisCriticos(req, res, categoriaSaneamento, porteMunicipio, menosOuMaisAfetado, 5);

    const responseObj = {
        semAgua: {
            maisAfetadosSemAguaGeral: JSON.parse(maisCriticosSemAguaGeral),
            maisAfetadosSemAguaPequeno: JSON.parse(maisCriticosSemAguaPequeno),
            maisAfetadosSemAguaMedio: JSON.parse(maisCriticosSemAguaMedio),
            maisAfetadosSemAguaGrande: JSON.parse(maisCriticosSemAguaGrande),
        }
    }

    res.json(JSON.parse(responseObj));
})

module.exports = router;