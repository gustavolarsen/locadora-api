const bcrypt = require('bcrypt');

describe('Testes de criptogrfia e validação de senha', () => {
  it('Deve gerar uma senha criptografada e comparar se o hash gerado confere com a senha infromada).', async () => {
    const password = '123456';

    const passwordHash = await bcrypt.hash(password, 8);
    const compareHash = await bcrypt.compare(password, passwordHash);

    expect(compareHash).toBe(true);
  });
});
