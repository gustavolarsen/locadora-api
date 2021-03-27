const { verify } = require('jsonwebtoken');

module.exports = {
  verifyAuthorization(request, response, next) {
    const header = request.headers.authorization;

    if (!header)
      return response.status(401).send({ erro: 'Token não informado' });

    const [, token] = header.split(' ');

    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      request.idCustomer = decoded.id;

      return next();
    } catch {
      throw new Error('Erro inesperado ao autenticar o usuário.');
    }
  },
};
