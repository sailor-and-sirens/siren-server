'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avatarUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        User.belongsToMany(models.Podcast, {through: 'UserPodcasts', onDelete: 'CASCADE'});
        User.belongsToMany(models.Episode, {through: 'UserEpisodes', as: 'Inbox', onDelete: 'CASCADE'});
      }
    }
  });
  return User;
};
