'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Playlists', 'UserId', {
      type: Sequelize.INTEGER
    });
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Playlists');
  }
};
