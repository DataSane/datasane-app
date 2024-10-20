const express = require('express');
const router = express.Router();
const relatoriosController = require('../../controllers/relatoriosController');

router.get('/relatorios', relatoriosController.getMunicipios);

module.exports = router;