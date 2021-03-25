const { Sequelize } = require('sequelize');
const database = require('../db.js');

const Movie = database.define(
  'Movies',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    director: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Movie;
