var database = require('../configs/database/connection');

async function municipios() {
    console.log('Starting catch municipio');

    var sqlCommand = `
        SELECT * FROM municipio;
    `;
    
    console.log("Running SQL Command " + sqlCommand);

    const resultQuery = await database.execute(sqlCommand);
    var resultToString = JSON.stringify(resultQuery);

    return resultToString; 
}

async function findMunicipioById(id){
    console.log('Starting catch municipio by id');

    try {
        const sqlCommand = 'SELECT * FROM municipio WHERE idMunicipio = ?';
        console.log("Running SQL Command: " + sqlCommand);

        const resultQuery = await database.execute(sqlCommand, [id]);
    
        if (resultQuery.length > 0) {
            return resultQuery[0]; 
        } else {
            throw new Error('Município não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar município por ID:', error);
        throw error;
    }
}

module.exports = {municipios, findMunicipioById};