'use strict';
module.exports = function (sequelize, DataTypes) {
  var UserEpisode = sequelize.define('UserEpisode', {
    UserId: DataTypes.INTEGER,
    EpisodeId: DataTypes.INTEGER,
    bookmarked: DataTypes.BOOLEAN,
    liked: DataTypes.BOOLEAN,
    currentTime: DataTypes.INTEGER, // changed from Time b/c data will be milliseconds
    lastPlayed: DataTypes.DATE
  }, {
    classMethods: {
      associate: function () {
        // associations can be defined here
      }
    }
  });
  return UserEpisode;
};
