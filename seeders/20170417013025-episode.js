'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('Episodes', [
      {
        title: 'Dummy Title',
        creator: 'Dummy Creator',
        description: 'Im a description',
        length: '00:24:00',
        releaseDate: 'Wed, 29 Mar 2017 00:00:00 -0400',
        category: 'Dummy Category',
        PodcastId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Another Dummy Title',
        creator: 'Another Dummy Creator',
        description: 'Im another description',
        length: '00:24:00',
        releaseDate: 'Wed, 29 Mar 2017 00:00:00 -0400',
        category: 'Another Dummy Category',
        PodcastId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('Episodes', null, {});
  }
};
