const bcrypt = require('bcrypt');
const yup = require('yup');
require('yup-password')(yup);

const Customer = require('../entities/Customer');

module.exports = {
  async execute(request, response) {
    const { name, email, password } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      password: yup.string().password().required(),
      email: yup.string().email().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).send({ erro: err.errors });
    }

    const passwordHash = await bcrypt.hash(password, 8);

    try {
      const customerExists = await Customer.findOne({ where: { email } });

      if (customerExists)
        return response.status(400).send({ erro: 'Cliente já cadastrado.' });

      const newCustomer = await Customer.create({
        name,
        email,
        password: passwordHash,
      });

      delete newCustomer.password;

      return response.status(200).send(newCustomer);
    } catch {
      throw new Error('Erro inesperado ao cadastrar um cliente.');
    }
  },
};
