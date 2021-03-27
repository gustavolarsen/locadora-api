const Rent = require('../entities/Rent');
const Movie = require('../entities/Movie');
const { Op } = require('sequelize');

module.exports = {
  async execute(request, response) {
    const idCustomer = request.idCustomer;
    const { idMovie } = request.params;

    try {
      const movie = await Movie.findOne({ where: { id: idMovie } });

      if (!movie)
        return response.status(404).send({ message: `Filme não encontrado.` });

      if (movie.amount <= 0)
        return response
          .status(404)
          .send({ message: `Filme ${movie.title} não está mais disponível.` });

      const rent = await Rent.findOne({
        where: {
          [Op.and]: [
            { idMovie },
            { idCustomer },
            { returnDate: { [Op.is]: null } },
          ],
        },
      });

      if (rent)
        return response.status(400).send({
          message: `O cliente já possui um exemplar do filme ${movie.title} locado. Não é possível locar outro exemplar do mesmo filme.`,
        });

      await Movie.update(
        { amount: movie.amount - 1 },
        {
          where: {
            id: idMovie,
          },
        }
      );

      const newRent = await Rent.create({
        rentalDate: new Date(),
        expectedReturnDate: expectedReturnDate(),
        idCustomer,
        idMovie,
      });

      return response.status(200).send(newRent);
    } catch {
      throw new Error('Erro inesperado ao alugar um filme.');
    }
  },
};

/**
 * Função que calcula a data de devolução do filme configurado em 2 dias a
 * contar da data de retirada.
 * Caso a data caia em um final de semana ela passa para o proximo dia util.
 * @returns Date
 */
function expectedReturnDate() {
  let date = new Date();
  date.setDate(date.getDate() + 2);

  let day = date.getDay();
  count = 0;

  while (day === 0 || day === 6) {
    day++;
    count++;
  }

  date.setDate(date.getDate() + count);
  return date;
}
