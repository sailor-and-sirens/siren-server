'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisode', 'bookmarked', Sequelize.BOOLEAN);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisode', 'bookmarked');
  }
};
