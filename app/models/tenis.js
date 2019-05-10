var client = require('../../config/dbconnection.js');

module.exports = {
    listarTenis,
    listarUmTenis,
    listarVendas,
    alterarTenis,
    salvarTenis,
    excluirTenis
}

function listarTenis(callback) {
    client.query('SELECT T.* FROM TENIS T', callback);
}

function listarUmTenis(id_tenis, callback) {
    client.query('SELECT * FROM TENIS WHERE ID_TENIS = ' + id_tenis, callback);
}


function listarVendas(id_tenis, callback) {
    client.query('SELECT V.* FROM VENDAS V INNER JOIN TENIS T ON T.ID_TENIS = V.ID_TENIS WHERE T.ID_TENIS ' + id_tenis + ' ORDER BY DT_VENDA DESC', callback);
}

function salvarTenis(dados, callback) {
    var msql = 'INSERT INTO TENIS(nome, marca, tamanho) VALUES(' + '\'' + dados.nome + '\', '
        + '\'' + dados.marca + '\', '
        + '\'' + dados.tamanho + '\')';
    client.query(msql, callback);
}

function alterarTenis(dados, callback) {
    var msql = "UPDATE TENIS SET NOME =  " + "\'" + dados.nome + "\', "
        + "MARCA = " + "\'" + dados.nome + "\', ";
    + "TAMANO = " + "\'" + dados.nome
        + " WHERRE ID_TENIS = " + dados.id_tenis;

    client.query(msql, callback);
}

function excluirTenis(id_tenis, callback) {
    client.query('DELETE FROM TENIS WHERE ID_TENIS = ' + id_tenis, callback);
}


