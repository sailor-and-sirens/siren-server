'use strict';
module.exports = function (sequelize, DataTypes) {
  var PlaylistEpisode = sequelize.define('PlaylistEpisode', {
    PlaylistId: DataTypes.INTEGER,
    EpisodeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function () {
        // associations can be defined here
      }
    }
  });
  return PlaylistEpisode;
};
