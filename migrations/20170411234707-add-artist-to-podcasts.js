'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Podcasts', 'artistName', Sequelize.STRING);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Podcasts', 'artistName');
  }
};
