'use strict';
module.exports = function (sequelize, DataTypes) {
  var Podcast = sequelize.define('Podcast', {
    feedUrl: DataTypes.STRING
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
