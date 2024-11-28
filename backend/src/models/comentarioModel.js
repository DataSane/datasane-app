var database = require('../configs/database/connection');

function getComentariosPorAlerta(idAlerta) {
    console.log('Starting catch Comentarios');

    var sqlCommand = `
        SELECT 
        comentario.idComentario AS ComentarioID,
        comentario.mensagem AS MensagemComentario,
        comentario.dataHora AS dataComentario,
        user.username AS Usuario,
        user.isadmin as Admin,
        user.userId as UserId
    FROM 
        comentario
    INNER JOIN 
        alerta ON comentario.fkAlerta = alerta.idAlerta
    INNER JOIN 
        user ON comentario.fkUser = user.userid
    WHERE idAlerta = ${idAlerta}
    ORDER BY dataHora;
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function adicionarComentario(userId, idAlerta, comentario) {
    console.log('Starting insert Comentario');

    var sqlCommand = `
        INSERT INTO comentario (fkAlerta, fkUser, mensagem, dataHora) VALUES (${idAlerta}, ${userId}, '${comentario}', now());
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function updateComentario(idComentario, comentario) {
    console.log('Starting update Alerta with id');

    var sqlCommand = `
        UPDATE comentario SET mensagem = '${comentario}' WHERE idComentario = ${idComentario};
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function deletarTodosComentariosAlerta(idAlerta) {
    console.log('Starting delete Comentarios por alerta');

    var sqlCommand = `
        DELETE FROM comentario WHERE fkAlerta = ${idAlerta};
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function deletarComentarioId(idComentario) {
    console.log('Starting delete Comentarios por alerta');

    var sqlCommand = `
        DELETE FROM comentario WHERE idComentario = ${idComentario};
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}


module.exports = { getComentariosPorAlerta, adicionarComentario, deletarTodosComentariosAlerta, updateComentario, deletarComentarioId };