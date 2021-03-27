const bcrypt = require('bcrypt');
const Customer = require('../entities/Customer');
const { sign } = require('jsonwebtoken');

module.exports = {
  async execute(request, response) {
    const { email, password } = request.body;

    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      return response.status(401).json({ erro: 'Usuário não encontrado' });
    }

    try {
      const passwordIsValid = await bcrypt.compare(password, customer.password);

      if (!passwordIsValid) {
        return response.status(401).json({ erro: 'Senha incorreta' });
      }

      const token = sign({ id: customer.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      return response.status(200).json({
        name: customer.name,
        email,
        token,
      });
    } catch {
      throw new Error('Erro inesperado ao efetuar o login.');
    }
  },
};
