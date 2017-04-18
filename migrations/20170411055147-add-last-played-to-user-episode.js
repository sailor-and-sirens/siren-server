'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisodes', 'lastPlayed', Sequelize.DATE);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisodes', 'lastPlayed');
  }
};
