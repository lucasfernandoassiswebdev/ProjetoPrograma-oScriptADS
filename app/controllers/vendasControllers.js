var Vendas = require('../models/vendas');

module.exports = {
    inicio,
    vendasInicio,
    vendasListar,
    vendasNovo,
    vendasSalvar,
    vendasBuscar,
    vendasExcluir

}

function inicio(req, res) {
    res.render('../app/views/index.ejs', { title: 'Projeto Final Script-2019' });
}

function vendasInicio(req, res) {
    res.render('../app/views/vendasInicio.ejs', { title: 'Menu Vendas' });
}

function vendasListar(req, res) {
    Veiculos.listarVeiculos(function (err, result) {
        if (err)
            throw err;

        res.render('../app/views/vendasListar.ejs', { title: 'Novas Vendas', vendas: result });
    });
};

function vendasBuscar(req, res) {
    var id_venda = req.params.codigo;

    Vendas.listarUmaVenda(id_venda, function (err, resultado_venda) {
        if (err)
            throw err;
        else
            Vendas.listarTenisVenda(id_venda, function (err, resultado_tenis) {
                if (err) {
                    throw err;
                } else {
                    res.render('../app/views/vendasEditar.ejs',
                        {
                            venda: resultado_venda,
                            lista_estacionamentos: resultado_tenis
                        });
                }
            });

    });
}

function vendasNovo(req, res) {
    var dados = {
        id_venda: "",
        dt_veda: "",
        nome_funcionario: ""
    };

    res.render('../app/views/veiculosEditar.ejs',
        {
            venda: dados,
            listaTenis: []
        });
}


function vendasSalvar(req, res) {
    var dados_venda = req.body;

    if (!dados_venda.id_venda)
        Vendas.salvarVenda(dados_venda, function (err, result) {
            if (err)
                throw err;

            res.redirect('/vendasListar');
        })
    else
        Vendas.alterarVenda(dados_venda, function (err, result) {
            if (err)
                throw err;

            res.redirect('/vendasListar');
        });
}

function vendasExcluir(req, res) {
    var id_venda = req.params.id_venda;

    Vendas.excluirVenda(id_venda, function (err, result) {
        if (err)
            throw err;

        res.redirect('/vendasListar');
    });
}
