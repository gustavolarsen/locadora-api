require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { router } = require('./routes.js');

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(helmet());

app.use(router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}

module.exports = app;
