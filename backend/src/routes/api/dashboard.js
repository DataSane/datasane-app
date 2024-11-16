const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');

router.get('/', (req, res) => {
    var municipiosMaisCriticoGeral = dashboardController.getMunicipioMaisCritico(req, res, 1);
    var municipiosMaisCriticoPequeno = dashboardController.getMunicipioMaisCritico(req, res, 2);

    res.json(JSON.parse(municipiosMaisCriticoGeral, municipiosMaisCriticoPequeno));
})

module.exports = router;