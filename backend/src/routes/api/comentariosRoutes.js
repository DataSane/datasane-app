const express = require('express');
const router = express.Router();
const comentarioController = require('../../controllers/comentarioController');

router.get('/:idAlerta', (req, res) => {
    comentarioController.getComentariosPorAlerta(req, res);
})

router.post('/adicionar', (req, res) => {
    comentarioController.addComentario(req, res);
})

router.delete('/deletar', (req, res) => {
    comentarioController.deletarComentario(req, res);
})

module.exports = router;