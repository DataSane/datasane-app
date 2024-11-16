var database = require('../configs/database/connection');

function municipioMaisCritico(idTipoMunicipio) {
    console.log('Starting catch the most critical Municipio');

    var sqlCommand = `
        SELECT m.*,
        (m.populacaoSemLixo / t.parametroSemColetaDeLixo) as razao
        FROM municipio as m JOIN agrupamentoMunicipios as a ON a.fkMunicipio = m.idMunicipio JOIN tipoMunicipio as t 
        ON a.fkTipoMunicipio = t.idTipoMunicipio WHERE t.idTipoMunicipio = ${idTipoMunicipio} ORDER BY razao DESC
        LIMIT 1;
    `;

    const resultQuery = database.execute(sqlCommand);
    const resultToString = JSON.stringify(resultQuery);

    return resultToString;
}

module.exports = { municipioMaisCritico };