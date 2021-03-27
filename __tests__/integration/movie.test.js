const request = require('supertest');
const app = require('../../src/server');

//Preapra um filme para testes
const movie = {
  title: 'Nome do filme',
  director: 'Diretor do filme',
  amount: 2,
};

describe('Testes de cadastro de Filmes', () => {
  it('Deve cadastrar um filme com sucesso.', async () => {
    const response = await request(app).post('/movies').send({
      title: movie.title,
      director: movie.director,
      amount: movie.amount,
    });

    expect(response.status).toEqual(200);
  });
});

describe('Testes de consulta de Filmes', () => {
  it('Deve retornar filmes disponíveis.', async () => {
    const response = await request(app).get('/movies');

    expect(response.body[0].amount).toBeGreaterThan(0);
    expect(response.status).toEqual(200);
  });

  it('Deve retornar filmes por título.', async () => {
    const response = await request(app).get(`/movies?title=${movie.title}`);

    expect(response.body.title).toEqual(movie.title);
    expect(response.status).toEqual(200);
  });

  it('Deve retornar que filme não foi encontrado.', async () => {
    const response = await request(app).get(`/movies?title=000`);
    expect(response.status).toEqual(404);
  });
});
