'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Podcasts', 'artworkUrl', Sequelize.STRING);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Podcasts', 'artworkUrl');
  }
};
