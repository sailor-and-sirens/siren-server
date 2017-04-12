'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisode', 'lastPlayed', Sequelize.DATEONLY);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisode', 'lastPlayed');
  }
};
