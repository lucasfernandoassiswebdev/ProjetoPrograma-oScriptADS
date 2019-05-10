var client = require('../../config/dbconnection.js');

module.exports = {
    listarVendas,
    listarUmaVenda,
    listarTenisVenda,
    alterarVenda,
    salvarVenda,
    excluirVenda
}

function listarVendas(callback) {
    client.query('SELECT V.* FROM VENDAS V', callback);
}

function listarUmaVenda(id_venda, callback) {
    client.query('SELECT * FROM VENDAS WHERE ID_VENDA = ' + id_venda, callback);
}

function listarTenisVenda(id_venda, callback) {
    client.query('SELECT T.* FROM VENDAS V INNER JOIN TENIS T ON T.ID_TENIS = V.ID_TENIS WHERE V.ID_VENDA = ' + id_venda, callback);
}

function salvarVenda(dados, callback) {
    var msql = 'INSERT INTO VENDA(DT_VENDA, NOME_FUNCIONARIO) VALUES(' + '\'' + new Date() + '\', '
        + '\'' + dados.nomefuncionario + '\')';
    client.query(msql);

    let id_venda;

    client.query('SELECT MAX(ID_VENDA) FROM VENDA', (error, result) => {
        if (error)
            console.eror('erro ao buscar id da venda gerada');

        id_venda = result;
    });

    dados.tenisVenda.forEach((tenis) => {
        msql = "INSERT INTO VENDA_TENIS(ID_VENDA, ID_TENIS) VALUES("
            + id_venda + ", " + tenis;
        client.query(msql, (error, result) => {
            if (error) {
                console.log('erro ao salvar tenis da venda.\nid da venda' + id_venda + " id do tenis: " + id_tenis);
            }
        });
    });

    callback(undefined, {});
}

function alterarVenda(dados, callback) {
    var msql = "UPDATE VENDA SET NOME_FUNCIONARIO =  " + "\'" + dados.nomefuncionario + "\'"
        + " WHERE ID_VENDA = " + dados.id_venda;

    client.query(msql, callback);
}

function excluirVenda(id_venda, callback) {
    client.query('DELETE FROM VENDA WHERE ID_VENDA = ' + id_venda, callback);
}
