const request = require('supertest');
const app = require('../src/server');

describe('Testes de autenticação do cliente', () => {
  it('Deve autenticar cliente com email e senha válidos.', async () => {
    const response = await request(app).post('/login').send({
      email: 'cliente@teste.com',
      senha: '123',
    });

    expect(response.status).toEqual(200);
  });

  it('Não pode permitir autenticar com email inválido.', async () => {
    const response = await request(app).post('/login').send({
      email: 'emailinvalido@teste.com',
      senha: '123',
    });

    expect(response.status).toEqual(401);
  });

  it('Não pode permitir autenticar com senha inválida.', async () => {
    const response = await request(app).post('/login').send({
      email: 'cliente@teste.com',
      senha: 'senhainvalida',
    });

    expect(response.status).toEqual(401);
  });
});
