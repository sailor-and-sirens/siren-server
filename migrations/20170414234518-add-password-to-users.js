'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'password', Sequelize.STRING);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users', 'password');
  }
};
