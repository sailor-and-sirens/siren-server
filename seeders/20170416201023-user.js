'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('Users', [
      { username: 'em',
        email: 'em@email.com',
        avatarUrl: null,
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
