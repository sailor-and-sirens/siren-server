'use strict';
module.exports = function (sequelize, DataTypes) {
  var Podcast = sequelize.define('Podcast', {
    collectionId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    feedUrl: DataTypes.STRING,
    primaryGenreName: DataTypes.STRING,
    artworkUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Podcast.belongsToMany(models.User, {through: 'UserPodcast', onDelete: 'CASCADE'});
      }
    }
  });
  return Podcast;
};
