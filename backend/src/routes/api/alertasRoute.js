const express = require('express');
const router = express.Router();
const alertaController = require('../../controllers/alertaController');

router.get('/', (req, res) => {
    alertaController.getAlertas(req, res);
})

router.get('/:idAlerta', (req, res) => {
    alertaController.getAlertaPorId(req, res);
})

router.post('/adicionar', (req, res) => {
    alertaController.addAlerta(req, res);
})

router.put('/atualizar/:idAlerta', (req, res) => {
    alertaController.updateAlerta(req, res);
})

router.delete('/deletar', (req, res) => {
    alertaController.deletarAlerta(req, res);
})



module.exports = router;