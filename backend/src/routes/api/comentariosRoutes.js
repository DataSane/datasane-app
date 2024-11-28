const express = require('express');
const router = express.Router();
const comentarioController = require('../../controllers/comentarioController');

router.get('/:idAlerta', (req, res) => {
    comentarioController.getComentariosPorAlerta(req, res);
})

router.post('/adicionar', (req, res) => {
    comentarioController.addComentario(req, res);
})

router.put('/atualizar/:idComentario', (req, res) => {
    comentarioController.updateComentario(req, res);
})

router.delete('/deletarTodosComentariosAlerta', (req, res) => {
    comentarioController.deletarTodosComentariosAlerta(req, res);
})

router.delete('/deletarComentarioId', (req, res) => {
    comentarioController.deletarComentarioId(req, res);
})

module.exports = router;