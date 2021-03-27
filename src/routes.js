const { Router } = require('express');

const createCustomerService = require('./services/CreateCustomerService');
const loginCustomerService = require('./services/LoginCustomerService');
const createMovieService = require('./services/CreateMovieService');
const availableMovieService = require('./services/AvailableMovieService');
const rentMovieService = require('./services/RentMovieService');
const returnMovieService = require('./services/returnMovieService');

const { verifyAuthorization } = require('./middlewares/verifyAuthoriozation');

const router = Router();

router.post('/customers', createCustomerService.execute);
router.post('/movies', createMovieService.execute);
router.post('/login', loginCustomerService.execute);
router.get('/movies', availableMovieService.execute);

router.post(
  '/movies/rent/:idMovie',
  verifyAuthorization,
  rentMovieService.execute
);

router.put(
  '/movies/return/:idMovie',
  verifyAuthorization,
  returnMovieService.execute
);

router.get('/', (request, response) => {
  response.status(200).send({ message: 'API da locadora NodeJS' });
});

module.exports = { router };
