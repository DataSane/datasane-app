var database = require('../configs/database/connection');

async function getMunicipios() {
    console.log('Starting catch Municipios');

    var sqlCommand = `
        SELECT * FROM Municipios;
    `;
    
    console.log("Running SQL Command " + sqlCommand);

    const resultQuery = await database.execute(sqlCommand);

    return resultQuery.rows;
}

module.exports = getMunicipios;