var comentarioModel = require('../models/comentarioModel');

function getComentariosPorAlerta(req, res) {
    const idAlerta = req.params.idAlerta;
    comentarioModel.getComentariosPorAlerta(idAlerta).then(response => {
        res.status(200).json(response);
    }).catch(err =>
        console.log("Error controller")
    )
}

function addComentario(req, res) {
    const userId =  req.body.idUser
    const idAlerta =  req.body.idAlerta
    const comentario = req.body.comentario;

    console.log(userId, idAlerta, comentario)

    comentarioModel.adicionarComentario(userId, idAlerta, comentario).then(response => {
        res.status(200).json(response);
    }).catch(err =>
        console.log("Error controller")
    )
}

function deletarComentario(req, res) {
    const idAlerta =  req.body.idAlerta

    comentarioModel.deletarComentario(idAlerta).then(response => {
        res.status(200).json(response);
    }).catch(err =>
        console.log("Error controller")
    )
}

module.exports = { getComentariosPorAlerta, addComentario, deletarComentario };