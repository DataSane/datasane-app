var database = require('../configs/database/connection');

function municipioMaisCritico(porteMunicipio, ordemLista) {
    console.log('Starting catch the most critical Municipio');

    ordemLista = ordemLista == "decrescent" ? "DESC" : "";

    if (porteMunicipio == "geral") {
        porteMunicipio = 1;
    } else if (porteMunicipio == "pequeno") {
        porteMunicipio = 2;
    } else if (porteMunicipio == "medio") {
        porteMunicipio = 3;
    } else if (porteMunicipio == "grande") {
        porteMunicipio = 4;
    }

    var sqlCommand = `
        SELECT m.*,
        (m.populacaoSemLixo / t.parametroSemColetaDeLixo) as razao
        FROM municipio as m JOIN agrupamentoMunicipios as a ON a.fkMunicipio = m.idMunicipio JOIN tipoMunicipio as t 
        ON a.fkTipoMunicipio = t.idTipoMunicipio WHERE t.idTipoMunicipio = ${porteMunicipio} ORDER BY razao ${ordemLista}
        LIMIT 1;
    `;

    console.log(sqlCommand);

    const resultQuery = database.execute(sqlCommand);
    const resultToString = JSON.stringify(resultQuery);

    return resultToString;
}

module.exports = { municipioMaisCritico };