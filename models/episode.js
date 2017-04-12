'use strict';
module.exports = function (sequelize, DataTypes) {
  var Episode = sequelize.define('Episode', {
    title: DataTypes.STRING,
    creator: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    length: DataTypes.TIME,
    releaseDate: DataTypes.DATEONLY,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Episode.belongsTo(models.Podcast, {onDelete: 'CASCADE'});
        Episode.belongsToMany(models.Playlist, {through: 'PlaylistEpisodes', onDelete: 'CASCADE'});
      }
    }
  });
  return Episode;
};
