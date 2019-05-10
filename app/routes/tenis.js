var controller = require('../controllers/tenisController');

app.get('/', controller.inicio);
app.get('/tenis/inicio', controller.tenisInicio);
app.get('/tenis/listar', controller.tenisListar);

app.get('/tenis/novo', controller.tenisNovo);
app.post('/tenis/salvar', controller.tenisSalvar);

app.get('/tenis/:codigo', controller.tenisBuscar);
app.delete('/tenis/excluir/:codigo', controller.tenisExcluir);
