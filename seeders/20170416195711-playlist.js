'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('Playlists', [
      { name: 'Bookmarks', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Listening To', UserId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('Playlists', null, {});
  }
};
