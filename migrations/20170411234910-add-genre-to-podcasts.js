'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Podcasts', 'primaryGenreName', Sequelize.STRING);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Podcasts', 'primaryGenreName');
  }
};
