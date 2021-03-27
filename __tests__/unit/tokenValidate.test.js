require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

describe('Testes de geração e validação de token de acesso', () => {
  it('Deve gerar um token JWT e extrair o id).', async () => {
    const id = 555;
    const token = sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const decoded = verify(token, process.env.JWT_SECRET);

    expect(decoded.id).toEqual(id);
  });
});
