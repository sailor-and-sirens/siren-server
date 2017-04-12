'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Podcasts', 'collectionId', Sequelize.INTEGER);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Podcasts', 'collectionId');
  }
};
