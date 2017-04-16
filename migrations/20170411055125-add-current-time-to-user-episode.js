'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisodes', 'currentTime', Sequelize.INTEGER);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisodes', 'currentTime');
  }
};
