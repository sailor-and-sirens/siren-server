'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisodes', 'lastPlayed', Sequelize.DATEONLY);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisodes', 'lastPlayed');
  }
};
