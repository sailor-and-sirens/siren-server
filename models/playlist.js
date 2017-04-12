'use strict';
module.exports = function (sequelize, DataTypes) {
  var Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Playlist.belongsTo(models.User);
      }
    }
  });
  return Playlist;
};
