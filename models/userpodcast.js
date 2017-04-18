'use strict';
module.exports = function (sequelize, DataTypes) {
  var UserPodcast = sequelize.define('UserPodcast', {
    UserId: DataTypes.INTEGER,
    PodcastId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function () {
        // associations can be defined here
      }
    }
  });
  return UserPodcast;
};
