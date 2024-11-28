var alertaModel = require('../models/alertaModel');
var comentarioModel = require('../models/comentarioModel');

function getAlertas(req, res) {
    alertaModel.alerta().then(response => {
        res.status(200).json(response);
    }).catch(err =>
        console.log("Error controller")
    )
}

function addAlerta(req, res) {
    const userId =  req.body.idUser
    const municipio = req.body.municipio;
    const descricao = req.body.descricao;
    console.log(userId, municipio, descricao)

    alertaModel.adicionarAlerta(userId, municipio, descricao).then(response => {
        
        res.status(200).json(response);
        
    }).catch(err =>
        console.log("Error controller")
    )
}

function getAlertaPorId(req, res) {
    const idAlerta =  req.params.idAlerta

    alertaModel.getAlertaPorId(idAlerta).then(response => {
        res.status(200).json(response);
    }).catch(err =>
        console.log("Error controller")
    )
}

function updateAlerta(req, res) {
    const userId =  req.body.idUser;
    const municipio = req.body.municipio;
    const descricao = req.body.descricao;
    const idAlerta = req.params.idAlerta;
    console.log(userId, municipio, descricao, idAlerta)

    alertaModel.updateAlerta(userId, municipio, descricao, idAlerta).then(response => {
        res.status(200).json(response);
    }).catch(err =>
        console.log("Error controller")
    )
}

function deletarAlerta(req, res) {
    const idAlerta =  req.body.idAlerta

    console.log(idAlerta);
    comentarioModel.deletarTodosComentariosAlerta(idAlerta).then(resComentario => {
        alertaModel.deletarAlerta(idAlerta).then(responseAlerta => {
            res.status(200).json(responseAlerta);
        })
    })
    .catch(err =>
        console.log("Error controller")
    )
}

module.exports = { getAlertas, addAlerta, getAlertaPorId, updateAlerta, deletarAlerta };