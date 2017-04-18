'use strict';
module.exports = function (sequelize, DataTypes) {
  var Episode = sequelize.define('Episode', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    length: DataTypes.TIME,
    releaseDate: DataTypes.DATEONLY,
    url: DataTypes.STRING,
    PodcastId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Episode.belongsTo(models.Podcast, {onDelete: 'CASCADE'});
        Episode.belongsToMany(models.Playlist, {through: 'PlaylistEpisodes', onDelete: 'CASCADE'});
        Episode.belongsToMany(models.User, {through: models.UserEpisode});
      }
    }
  });
  return Episode;
};
