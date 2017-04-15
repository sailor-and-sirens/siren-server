'use strict';
module.exports = function (sequelize) {
  var PlaylistEpisode = sequelize.define('PlaylistEpisode', {
  }, {
    classMethods: {
      associate: function () {
        // associations can be defined here
      }
    }
  });
  return PlaylistEpisode;
};
