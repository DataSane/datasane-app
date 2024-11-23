var database = require('../configs/database/connection');

async function municipios() {
    console.log('Starting catch Municipios');

    var sqlCommand = `
        SELECT * FROM municipio;
    `;

    console.log("Running SQL Command " + sqlCommand);

    const resultQuery = await database.execute(sqlCommand);
    var resultToString = JSON.stringify(resultQuery);

    return resultToString;
}

module.exports = { municipios };