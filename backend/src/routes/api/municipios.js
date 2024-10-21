const express = require('express');
const router = express.Router();
const municipiosController = require('../../controllers/municipiosController');

router.get('/', async (req, res) => {
    var municipios = await municipiosController.getMunicipios(req, res);

    res.json(JSON.parse(municipios));
});

module.exports = router;