'use strict';
module.exports = function (sequelize) {
  var UserPodcast = sequelize.define('UserPodcast', {
  }, {
    classMethods: {
      associate: function () {
        // associations can be defined here
      }
    }
  });
  return UserPodcast;
};
