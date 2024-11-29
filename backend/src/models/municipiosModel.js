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
    } else {
        console.error('Invalid categoriaSaneamento. Please use "semLixo", "semAgua", "populacaoSemEsgoto" or "inundacao".');
        return;
    }
}

function verificarPorteMunicipio(porteMunicipio) {
    if (porteMunicipio == "geral") {
        return 1;
    } else if (porteMunicipio == "pequeno") {
        return 2;
    } else if (porteMunicipio == "medio") {
        return 3;
    } else if (porteMunicipio == "grande") {
        return 4;
    } else {
        console.error('Invalid porteMunicipio. Please use "geral", "pequeno", "medio" or "grande".');
        return;
    }
}

function verificarMenosOuMaisAfetados(menosOuMaisAfetado) {
    if (menosOuMaisAfetado == "maisAfetado") {
        return "DESC";
    } else if (menosOuMaisAfetado == "menosAfetado") {
        return "";
    } else {
        console.error('Invalid menosOuMaisAfetado. Please use "maisAfetado" or "menosAfetado".');
        return;
    }
}

async function filteredMunicipios(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado) {
    console.log('Starting catch municipios filtered');

    verificarCategoria(categoriaSaneamento);
    let porteMunicipioResponse = verificarPorteMunicipio(porteMunicipio);
    let menosOuMaisAfetadoResponse = verificarMenosOuMaisAfetados(menosOuMaisAfetado);

    var sqlCommand = `
        SELECT m.*,
        (m.${atributoMunicipio} / t.${atributoTipoMunicipio}) as razao
        FROM municipio as m JOIN agrupamentoMunicipios as a ON a.fkMunicipio = m.idMunicipio JOIN tipoMunicipio as t 
        ON a.fkTipoMunicipio = t.idTipoMunicipio WHERE t.idTipoMunicipio = ${porteMunicipioResponse} AND m.${atributoMunicipio} > 0.00 ORDER BY razao ${menosOuMaisAfetadoResponse};
    `;

    console.log(sqlCommand);

    return await database.execute(sqlCommand);
}

async function municipios(porteMunicipio) {
    console.log('Starting catch Municipio');

    let porteMunicipioResponse = await verificarPorteMunicipio(porteMunicipio);

    var sqlCommand = `
            SELECT m.* FROM municipio as m JOIN agrupamentoMunicipios as a ON a.fkMunicipio = m.idMunicipio JOIN tipoMunicipio as t 
            ON a.fkTipoMunicipio = t.idTipoMunicipio WHERE t.idTipoMunicipio = ${porteMunicipioResponse};
        `;

    console.log("Running SQL Command " + sqlCommand);

    const resultQuery = await database.execute(sqlCommand);
    var resultToString = JSON.stringify(resultQuery);

    return resultToString;
}


async function findMunicipioById(id) {
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

module.exports = { municipios, filteredMunicipios, findMunicipioById };
