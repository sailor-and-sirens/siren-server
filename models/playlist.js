'use strict';
module.exports = function (sequelize, DataTypes) {
  var Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Playlist.belongsTo(models.User);
        Playlist.belongsToMany(models.Episode, {through: models.PlaylistEpisode});
      }
    }
  });
  return Playlist;
};
