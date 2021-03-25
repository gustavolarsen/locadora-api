const bcrypt = require('bcrypt');
const Customer = require('../entities/Customer');
const jwt = require('jsonwebtoken');

module.exports = {
  async auth(request, response) {
    try {
      const { email, password } = request.body;

      const customer = await Customer.findOne({ where: { email } });

      if (!customer) {
        return response
          .status(401)
          .json({ erro: 'Usuário ou senha inválidos' });
      }

      const passwordIsValid = await bcrypt.compare(password, customer.password);

      if (!passwordIsValid) {
        return response
          .status(401)
          .json({ erro: 'Usuário ou senha inválidos' });
      }

      const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      return response.status(200).json({
        name: customer.name,
        email,
        token,
      });
    } catch (error) {
      return response.status(400).send(error);
    }
  },
};
