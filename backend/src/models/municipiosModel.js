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
        porteMunicipio = 1;
    } else if (porteMunicipio == "pequeno") {
        porteMunicipio = 2;
    } else if (porteMunicipio == "medio") {
        porteMunicipio = 3;
    } else if (porteMunicipio == "grande") {
        porteMunicipio = 4;
    } else {
        console.error('Invalid porteMunicipio. Please use "geral", "pequeno", "medio" or "grande".');
        return;
    }
}

function verificarMenosOuMaisAfetados(menosOuMaisAfetado) {
    if (menosOuMaisAfetado == "maisAfetado") {
        menosOuMaisAfetado = "DESC";
    } else if (menosOuMaisAfetado == "menosAfetado") {
        menosOuMaisAfetado = "";
    } else {
        console.error('Invalid menosOuMaisAfetado. Please use "maisAfetado" or "menosAfetado".');
        return;
    }
}
    
async function filteredMunicipios(categoriaSaneamento, porteMunicipio, menosOuMaisAfetado) {
    console.log('Starting catch municipios filtered');

    verificarCategoria(categoriaSaneamento);
    verificarPorteMunicipio(porteMunicipio);
    verificarMenosOuMaisAfetados(menosOuMaisAfetado);

    var sqlCommand = `
        SELECT m.*,
        (m.${atributoMunicipio} / t.${atributoTipoMunicipio}) as razao
        FROM municipio as m JOIN agrupamentoMunicipios as a ON a.fkMunicipio = m.idMunicipio JOIN tipoMunicipio as t 
        ON a.fkTipoMunicipio = t.idTipoMunicipio WHERE t.idTipoMunicipio = ${porteMunicipio} AND m.${atributoMunicipio} > 0.00 ORDER BY razao ${menosOuMaisAfetado} LIMIT 2;
    `;

    console.log(sqlCommand);

    return await database.execute(sqlCommand);
}

async function municipios() {
    console.log('Starting catch Municipio');

    var sqlCommand = `
            SELECT * FROM municipio;
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
