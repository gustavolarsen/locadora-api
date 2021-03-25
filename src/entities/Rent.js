const { Sequelize } = require('sequelize');
const database = require('../db.js');

const Rent = database.define(
  'Rents',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    rentalDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    expectedReturnDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    returnDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    idCustomer: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id',
      },
    },

    idMovie: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Movie',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Rent;
