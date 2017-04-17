'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('UserEpisodes', [
      {
        UserId: 1,
        EpisodeId: 1,
        bookmarked: null,
        liked: null,
        currentTime: null,
        lastPlayed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('UserEpisodes', null, {});
  }
};
