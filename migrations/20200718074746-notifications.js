'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable(
      'notifications',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
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
  return  queryInterface.dropAllTables()

  }
};
