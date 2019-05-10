var Tenis = require('../models/tenis');

module.exports = {
    inicio,
    tenisInicio,
    tenisListar,
    tenisNovo,
    tenisSalvar,
    tenisBuscar,
    tenisExcluir
}

function inicio(req, res) {
    res.render('../app/views/index.ejs', { title: 'Projeto Final Script-2019' });
}

function tenisInicio(req, res) {
    res.render('../app/views/tenisInicio.ejs', { title: 'Menu tênis' });
}

function tenisListar(req, res) {
    Tenis.listartenis(function (err, result) {
        if (err)
            throw err;

        res.render('../app/views/tenisListar.ejs',
            {
                title: 'Novos tenis',
                tenis: result
            });
    });
};


function tenisBuscar(req, res) {
    var id_tenis = req.params.id_tenis;

    Tenis.listarUmTenis(id_tenis, function (err, dados_tenis) {
        if (err)
            throw err;
        else
            Tenis.listarVendas(dados_tenis.id_tenis, function (err, resultado_vendas) {
                if (err)
                    throw err;
                else {
                    res.render('../app/views/tenisEditar.ejs',
                        {
                            tenis: dados_tenis,
                            lista_vendas: resultado_vendas
                        });
                }
            });
    });
}

function tenisNovo(req, res) {
    var dados_tenis = {
        nome: "",
        marca: "",
        tamanho: ""
    };


    res.render('../app/views/tenisEditar.ejs',
        {
            tenis: dados_tenis,
            lista_estacionamentos: []
        });
}


function tenisSalvar(req, res) {
    var dados_tenis = req.body;

    if (!dados_tenis.id_tenis)
        Tenis.salvartenis(dados_tenis, function (err, result) {
            if (err)
                throw err;

            res.redirect('/tenisListar');
        })
    else
        Tenis.alterartenis(dados, function (err, result) {
            if (err)
                throw err;

            res.redirect('/tenisListar');
        });
}

function tenisExcluir(req, res) {
    var id = req.params.codigo;

    Tenis.excluirtenis(id, function (err, result) {
        if (err)
            throw err;

        res.redirect('/tenisListar');
    });
}

