'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserEpisodes', 'liked', Sequelize.BOOLEAN);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserEpisodes', 'liked');
  }
};
