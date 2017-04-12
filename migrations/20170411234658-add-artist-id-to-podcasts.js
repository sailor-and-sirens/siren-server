'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Podcasts', 'artistId', Sequelize.INTEGER);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Podcasts', 'artistId');
  }
};
