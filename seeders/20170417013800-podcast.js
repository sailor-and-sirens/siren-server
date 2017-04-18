'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('Podcasts', [
      {
        collectionId: 1,
        artistId: 1,
        artistName: 'Dummy Artist Name',
        name: 'Dummy Podcast Name',
        feedUrl: 'http://www.dummyUrl.com',
        primaryGenreName: 'dummy genre',
        artworkUrl: 'http://www.artworkUrl.com',
        artworkUrl600: 'http://www.anotherArtworkUrl.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('Podcasts', null, {});
  }
};
