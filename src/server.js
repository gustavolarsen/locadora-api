const express = require('express');

require('dotenv').config();

const { router } = require('./routes.js');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}

module.exports = app;
