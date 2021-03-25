const request = require('supertest');
const app = require('../src/server');

describe('Testes serviços do Filme', () => {
  it('Deve cadastrar um filme com sucesso.', async () => {
    const response = await request(app).post('/movies').send({
      title: 'Nome do filme',
      director: 'Diretor do filme',
      amout: 3,
    });

    expect(response.status).toEqual(200);
  });
});
