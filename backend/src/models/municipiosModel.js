var database = require('../configs/database/connection');

async function municipios() {
    console.log('Starting catch Municipios');

    var sqlCommand = `
        SELECT * FROM Municipios;
    `;
    
    console.log("Running SQL Command " + sqlCommand);

    const resultQuery = await database.execute(sqlCommand);
    
    var string = JSON.stringify(resultQuery);

    return string; 
}

module.exports = {municipios};