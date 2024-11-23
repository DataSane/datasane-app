const express = require('express');
const router = express.Router();
const municipiosController = require('../../controllers/municipiosController');

router.get('/', async (req, res) => {
    var municipios = await municipiosController.getMunicipios(req, res);

    res.json(JSON.parse(municipios));
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const municipio = await municipiosController.getMunicipioById(id);

        if (municipio) {
            res.json(municipio);
        } else {
            res.status(404).json({ error: 'Município não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o município' });
    }
});

module.exports = router;