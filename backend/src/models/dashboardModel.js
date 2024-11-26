var database = require('../configs/database/connection');

let atributoMunicipio;
let atributoTipoMunicipio;
let parametroSnis;

function verificarCategoria(categoriaSaneamento) {
    if (categoriaSaneamento == "semLixo") {
        parametroSnis = "95.7";
        atributoMunicipio = "populacaoSemLixo";
        atributoTipoMunicipio = "parametroSemColetaDeLixo";
    } else if (categoriaSaneamento == "semAgua") {
        parametroSnis = "90.9";
        atributoMunicipio = "populacaoSemAgua";
        atributoTipoMunicipio = "parametroSemAgua";
    } else if (categoriaSaneamento == "semEsgoto") {
        parametroSnis = "80.9";
        atributoMunicipio = "populacaoSemEsgoto";
        atributoTipoMunicipio = "parametroSemEsgoto";
    } else if (categoriaSaneamento == "inundacao") {
        parametroSnis = "86.8";
        atributoMunicipio = "domicilioSujeitoInundacoes";
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

async function qtdAcimaEAbaixoCobertura(categoriaSaneamento) {
    console.log('Starting catch municipios with above and below coverage');

    verificarCategoria(categoriaSaneamento);

    var sqlCommandAcima = `
        SELECT COUNT(*) FROM municipio as m WHERE (100 - m.${atributoMunicipio}) < ${parametroSnis};
    `;

    var sqlCommandAbaixo = `
        SELECT COUNT(*) FROM municipio as m WHERE (100 - m.${atributoMunicipio}) < ${parametroSnis};
    `;

    const resultAcima = await database.execute(sqlCommandAcima);
    const resultAbaixo = await database.execute(sqlCommandAbaixo);

    return {
        acima: resultAcima,
        abaixo: resultAbaixo
    };
}

module.exports = { municipiosMaisCriticos, qtdAcimaEAbaixoCobertura };