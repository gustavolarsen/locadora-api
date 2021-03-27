const Movie = require('../entities/Movie');

const { Op } = require('sequelize');

module.exports = {
  async execute(request, response) {
    const { title } = request.query;

    try {
      //se usuario informou filtro de titulo, então retorna o filme informado,
      //se estiver disponível
      if (title) {
        console.log('aqui', title);

        const movieByTitle = await Movie.findOne({
          where: { title },
        });

        if (!movieByTitle)
          return response
            .status(404)
            .send({ message: 'Filme não encontrado.' });

        return response.status(200).send(movieByTitle);
      } else {
        //se usuario NÃO informou filtro de titulo retorna a lista completa de
        //filmes disponíveis.
        const movieListAvailable = await Movie.findAll({
          where: { amount: { [Op.gt]: 0 } },
        });

        if (!movieListAvailable)
          return response
            .status(404)
            .send({ message: 'Nenhum filme foi encontrado.' });

        return response.status(200).send(movieListAvailable);
      }
    } catch {
      throw new Error('Erro inesperado ao consultar filmes disponíveis.');
    }
  },
};
