'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserPodcast = sequelize.define('UserPodcast', {
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserPodcast;
};
