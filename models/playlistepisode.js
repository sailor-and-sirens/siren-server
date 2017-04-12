'use strict';
module.exports = function(sequelize, DataTypes) {
  var PlaylistEpisode = sequelize.define('PlaylistEpisode', {
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PlaylistEpisode;
};
