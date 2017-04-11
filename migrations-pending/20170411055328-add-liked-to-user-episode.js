'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisode', 'liked', Sequelize.BOOLEAN);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisode', 'liked');
  }
};
