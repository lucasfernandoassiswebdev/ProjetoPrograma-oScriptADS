var controller = require('../controllers/vendasControllers');

app.get('/', controller.inicio);
app.get('/vendas/inicio', controller.vendasInicio);
app.get('/vendas/listar', controller.vendasListar);

app.get('/vendas/novo', controller.vendasNovo);
app.post('/vendas/salvar', controller.vendasSalvar);

app.get('/vendas/:codigo', controller.vendasBuscar);
app.get('/vendas/excluir/:codigo', controller.vendasExcluir);
