const request = require('supertest');
const app = require('../src/server');

describe('Testes serviços do Cliente', () => {
  it('Deve cadastrar um cliente com sucesso.', async () => {
    const response = await request(app).post('/customers').send({
      name: 'Cliente teste',
      email: 'cliente@teste.com',
      passwaord: '123',
    });
    expect(response.status).toEqual(200);
  });

  it('Não pode permirmitir cadastrar um cliente duplicado.', async () => {
    const response = await request(app).post('/customers').send({
      name: 'Cliente teste',
      email: 'cliente@teste.com',
      passwaord: '123',
    });
    expect(response.status).toEqual(400);
  });
});
