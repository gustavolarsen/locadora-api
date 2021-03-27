const request = require('supertest');
const app = require('../../src/server');
const Customer = require('../../src/entities/Customer');

let movie;
let customer;
let token;

//preparando a base para rodar os testes de aluguel de filme
beforeAll(async () => {
  //cria um filme especifico para a locação
  const responseMovie = await request(app).post('/movies').send({
    title: 'Filme de Aluguel',
    director: 'Diretor Aluguel',
    amount: 1,
  });

  movie = responseMovie.body;

  //carrega o usuario para a locação caso ele ja exista
  customer = await Customer.findOne({ where: { email: 'email@aluguel.com' } });

  //se nao existir, cria-se o usuaro que fará a locação
  if (!customer) {
    const responseCustomer = await request(app).post('/customers').send({
      name: 'Cliente de Aluguel',
      email: 'email@aluguel.com',
      password: 'SenhaFort3#!',
    });
    customer = responseCustomer.body;
  }

  //autentica o usuario, pois a locação requer um usuaro autenticado
  const responseLogin = await request(app)
    .post('/login')
    .send({ email: customer.email, password: 'SenhaFort3#!' });

  token = responseLogin.body.token;
});

describe('Testes de alguel do filme', () => {
  it('Deve alugar o filme para o cliente.', async () => {
    const response = await request(app)
      .post(`/movies/rent/${movie.id}`)
      .set('Authorization', 'bearer ' + token);

    expect(response.status).toEqual(200);
  });

  it('Não deve permitir alugar um filme que não está mais disponível.', async () => {
    const response = await request(app)
      .post(`/movies/rent/${movie.id}`)
      .set('Authorization', 'bearer ' + token);

    expect(response.status).toEqual(404);
  });

  it('Não deve alugar um filme que não foi encontrado.', async () => {
    const response = await request(app)
      .post(`/movies/rent/0`)
      .set('Authorization', 'bearer ' + token);

    expect(response.status).toEqual(404);
  });
});

describe('Testes de devolução do filme', () => {
  it('Deve devolver o filme alugado pelo cliente.', async () => {
    const response = await request(app)
      .put(`/movies/return/${movie.id}`)
      .set('Authorization', 'bearer ' + token);

    expect(response.status).toEqual(200);
  });

  it('Não deve devolver um filme que não teve sua locação encontrada.', async () => {
    const response = await request(app)
      .put(`/movies/return/0`)
      .set('Authorization', 'bearer ' + token);

    expect(response.status).toEqual(404);
  });
});
