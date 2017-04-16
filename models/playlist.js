'use strict';
module.exports = function (sequelize, DataTypes) {
  var Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Playlist.belongsTo(models.User);
      }
    }
  });
  return Playlist;
};
