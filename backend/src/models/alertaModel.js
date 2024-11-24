var database = require('../configs/database/connection');

function alerta() {
    console.log('Starting catch Alertas');

    var sqlCommand = `
        SELECT * FROM alerta ORDER BY dataCriacao DESC;
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function adicionarAlerta(idUser, municipio, descricao) {
    console.log('Starting insert Alertas');

    var sqlCommand = `
        INSERT INTO alerta (fkUser, municipio, descricao, dataCriacao) VALUES (${idUser}, '${municipio}', '${descricao}', now());
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function getAlertaPorId(idAlerta) {
    console.log('Starting get Alerta with id');

    var sqlCommand = `
        SELECT * FROM alerta WHERE idAlerta = ${idAlerta};
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function updateAlerta(idUser, municipio, descricao, idAlerta) {
    console.log('Starting update Alerta with id');

    var sqlCommand = `
        UPDATE alerta SET municipio = '${municipio}', descricao = '${descricao}' WHERE idAlerta = ${idAlerta};
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

function deletarAlerta(idAlerta) {
    console.log('Starting delete Alerta with id');

    var sqlCommand = `
        DELETE FROM alerta WHERE idAlerta = ${idAlerta};
    `;

    // console.log("Running SQL Command " + sqlCommand);

    // const resultQuery = await database.execute(sqlCommand);
    // var resultToString = JSON.stringify(resultQuery);

    return database.execute(sqlCommand);
}

module.exports = { alerta, adicionarAlerta, getAlertaPorId, updateAlerta, deletarAlerta };