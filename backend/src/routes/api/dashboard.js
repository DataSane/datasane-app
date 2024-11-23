const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');

router.get('/', (req, res) => {
    var municipiosMaisCriticoGeral = dashboardController.getMunicipioMaisCritico(req, res, "semLixo", "grande", "decrescent", 1);
    // var municipiosMaisCriticoPequeno = dashboardController.getMunicipioMaisCritico(req, res, "pequeno", "crescent");

    res.json(JSON.parse(municipiosMaisCriticoGeral));
})

module.exports = router;