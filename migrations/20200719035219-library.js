'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'libraries',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        book_name: Sequelize.STRING,
        subject: Sequelize.INTEGER,
        writer: Sequelize.STRING,
        class: Sequelize.INTEGER,
        published: Sequelize.DATE,
        creating_date: Sequelize.DATE,
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropAllTables()

  }
};
