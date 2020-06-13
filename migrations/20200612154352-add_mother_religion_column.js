'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn('users', 'mother', {
      //   type: Sequelize.STRING
      // }),
      // queryInterface.addColumn('users', 'religion', {
      //   type: Sequelize.INTEGER,
      // }),
      // queryInterface.addColumn('users', 'admission_date', {
      //   type: Sequelize.DATE,
      // }),
      // queryInterface.addColumn('users', 'father_occupation', {
      //   type: Sequelize.DATE,
      // }),
      // queryInterface.addColumn('users', 'description', {
      //   type: Sequelize.TEXT,
      // }),
      // queryInterface.addColumn('users', 'admission_id', {
      //   type: Sequelize.INTEGER,
      // }),
      // queryInterface.addColumn('users', 'blood_grp', {
      //   type: Sequelize.STRING,
      // }),
      queryInterface.addColumn('users', 'description', {
        type: Sequelize.TEXT,
      })
    ]);

  },

  down: (queryInterface, Sequelize) => {
    Promise.all(
      [
        queryInterface.removeColumn('users', 'mother'),
        queryInterface.removeColumn('users', 'religion'),
        queryInterface.removeColumn('users', 'admission_date')
      ]
    )
  }
};
