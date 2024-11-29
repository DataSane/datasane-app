const express = require('express');
const router = express.Router();
const municipiosController = require('../../controllers/municipiosController');

router.get('/', async (req, res) => {
    var municipios = await municipiosController.getMunicipios(req, res);

    res.json(JSON.parse(municipios));
});

router.get('/filters', async (req, res) => {
    try {
        const categoriaSaneamento = req.query.categoriaSaneamento;
        const porteMunicipio = req.query.porteSelecionado;
        const menosOuMaisAfetado = req.query.menosOuMaisAfetados;

        const filtered = await municipiosController.getMunicipiosFiltered(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado);

        if (filtered) {
            res.json(filtered);
        } else {
            res.status(404).json({ error: 'Nenhum município encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao filtrar os municípios' });
    }
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