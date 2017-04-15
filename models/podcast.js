'use strict';
module.exports = function (sequelize, DataTypes) {
  var Podcast = sequelize.define('Podcast', {
    collectionId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    artistName: DataTypes.STRING,
    name: DataTypes.STRING,
    feedUrl: DataTypes.STRING,
    primaryGenreName: DataTypes.STRING,
    artworkUrl: DataTypes.STRING,
    artworkUrl600: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Podcast.belongsToMany(models.User, {through: 'UserPodcasts', onDelete: 'CASCADE'});
        Podcast.hasMany(models.Episode);
      }
    }
  });
  return Podcast;
};
