const bcrypt = require('bcrypt');
const Customer = require('../entities/Customer');

module.exports = {
  async create(request, response) {
    try {
      const { name, email, password } = request.body;

      const passwordHash = await bcrypt.hash(password, 8);

      const newCustomer = await Customer.create({
        name,
        email,
        password: passwordHash,
      });

      return response.status(200).json(newCustomer);
    } catch (error) {
      return response.status(400).send(error);
    }
  },
};
