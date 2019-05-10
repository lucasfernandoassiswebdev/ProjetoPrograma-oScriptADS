/*
*   criar objetos básicos
*/
var express = require('express');
var path = require('path');
var body = require('body-parser');
var load = require('express-load');
var methodOverride = require('method-override');

// instanciando objeto express
app = express();

// configurando recursos para tratamento json
app.use(body.urlencoded({extended:true}));
app.use(body.json());

// diretorio estático é o public
//app.use(express.static('public'));

// configurando a porta para http
app.set('port', 3000);

// view engine setup
//app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

load('models', {cwd: 'app'}).then('controllers').then('routes').into(app);

module.exports = app;
