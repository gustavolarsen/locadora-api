const { Router } = require('express');

const createCustomerService = require('./services/CreateCustomerService.js');
const authCustomerService = require('./services/AuthCustomerService.js');

const createMovieService = require('./services/CreateMovieService.js');
const listMovieService = require('./services/ListMovieService.js');

const router = Router();

router.post('/customers', createCustomerService.create);

router.post('/movies', createMovieService.create);
router.get('/movies', listMovieService.index);

router.post('/login', authCustomerService.auth);

router.get('/', (request, response) => {
  response.status(200).json({ ok: true });
});

module.exports = { router };
