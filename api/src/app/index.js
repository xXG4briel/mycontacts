const express = require('express');
require('express-async-errors'); // evitar erros async 
const routes = require('./routes');

const app = express();
// middleware para fazer o parse do body
app.use(express.json());
// rotas
app.use(routes);
// Error Handler -> Manipulador de erros
app.use((error, request, response, next) => {
    response.sendStatus(500);
});