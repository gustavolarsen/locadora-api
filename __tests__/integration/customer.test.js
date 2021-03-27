const request = require('supertest');
const app = require('../../src/server');

//Prepara um usuario para testes
const newEmail = `${Math.random().toString(36).slice(-10)}@email.com`;
const customer = {
  name: 'Cliente de Testes',
  email: newEmail,
  password: 'SenhaFort3!',
};

describe('Testes de cadastro do Cliente', () => {
  it('Não pode permitir cadastrar um cliente com email inválido.', async () => {
    const response = await request(app).post('/customers').send({
      name: customer.name,
      email: 'emailsemarroba',
      password: customer.password,
    });
    expect(response.status).toBe(400);
  });

  it('Não pode permitir cadastrar um cliente com senha fraca.', async () => {
    const response = await request(app).post('/customers').send({
      name: customer.name,
      email: customer.email,
      password: '123',
    });
    expect(response.status).toBe(400);
  });

  it('Deve cadastrar um cliente com sucesso.', async () => {
    const response = await request(app).post('/customers').send({
      name: customer.name,
      email: customer.email,
      password: customer.password,
    });
    expect(response.status).toEqual(200);
  });

  it('Não pode permitir cadastrar um cliente duplicado.', async () => {
    const response = await request(app).post('/customers').send({
      name: customer.name,
      email: customer.email,
      password: customer.password,
    });
    expect(response.status).toBe(400);
  });
});

describe('Teste de Login do cliente', () => {
  it('Deve efetuar o login do cliente com sucesso', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: customer.email, password: customer.password });

    expect(response.body).toHaveProperty('token');
  });

  it('Deve retornar erro de login por senha incorreta', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: customer.email, password: 'senhaincorreta' });

    expect(response.status).toBe(401);
  });

  it('Deve retornar erro de login por cliente não encontrado', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'email@nao.cadastrado', password: customer.password });

    expect(response.status).toBe(401);
  });
});
