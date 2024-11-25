var database = require('../configs/database/connection');

let atributoMunicipio;
let atributoTipoMunicipio;

function verificarCategoria(categoriaSaneamento) {
    if (categoriaSaneamento == "semLixo") {
        atributoMunicipio = "populacaoSemLixo";
        atributoTipoMunicipio = "parametroSemColetaDeLixo";
    } else if (categoriaSaneamento == "semAgua") {
        atributoMunicipio = "populacaoSemAgua";
        atributoTipoMunicipio = "parametroSemAgua";
    } else if (categoriaSaneamento == "semEsgoto") {
        atributoMunicipio = "populacaoSemEsgoto";
        atributoTipoMunicipio = "parametroSemEsgoto";
    }
}

async function municipiosMaisCriticos(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado) {
    console.log('Starting catch the most critical Municipio(s)');

    verificarCategoria(categoriaSaneamento);

    if (porteMunicipio == "geral") {
        porteMunicipio = 1;
    } else if (porteMunicipio == "pequeno") {
        porteMunicipio = 2;
    } else if (porteMunicipio == "medio") {
        porteMunicipio = 3;
    } else if (porteMunicipio == "grande") {
        porteMunicipio = 4;
    }

    menosOuMaisAfetado = menosOuMaisAfetado == "maisAfetado" ? "DESC" : "";

    var sqlCommand = `
        SELECT m.*,
        (m.${atributoMunicipio} / t.${atributoTipoMunicipio}) as razao
        FROM municipio as m JOIN agrupamentoMunicipios as a ON a.fkMunicipio = m.idMunicipio JOIN tipoMunicipio as t 
        ON a.fkTipoMunicipio = t.idTipoMunicipio WHERE t.idTipoMunicipio = ${porteMunicipio} AND m.${atributoMunicipio} > 0.00 ORDER BY razao ${menosOuMaisAfetado}
        LIMIT 5;
    `;

    console.log(sqlCommand);

    return await database.execute(sqlCommand);
}

async function qtdAcimaAbaixoCobertura(categoriaSaneamento) {
    console.log('Starting catch municipios with above and below coverage');

    verificarCategoria(categoriaSaneamento);

    var sqlCommand = `
        SELECT COUNT(*) FROM municipio as m JOIN agrupamentoMunicipios as a ON a.fkMunicipio = m.idMunicipio JOIN tipoMunicipio as t 
        ON a.fkTipoMunicipio = t.idTipoMunicipio WHERE t.idTipoMunicipio = 1 AND (100 - m.${atributoMunicipio}) < 80.9;
    `;

    return await database.execute(sqlCommand);
}

module.exports = { municipiosMaisCriticos, qtdAcimaAbaixoCobertura };