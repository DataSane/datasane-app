const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');

router.post('/', (req, res) => {
    dashboardController.getMunicipiosMaisCriticos(req, res);
})

router.post('/cobertura', (req, res) => {
    dashboardController.getQtdAcimaEAbaixoCobertura(req, res);
})

module.exports = router;