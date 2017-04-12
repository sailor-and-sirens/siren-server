'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisodes', 'bookmarked', Sequelize.BOOLEAN);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisodes', 'bookmarked');
  }
};
