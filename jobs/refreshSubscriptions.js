var schedule = require('node-schedule');
var getNewEpisodes = require('../middleware/getNewEpisodes');

var SIREN = {
  scheduleJob: function () {
    var rule = '0 * * * *';
    schedule.scheduleJob(rule, function () {
      console.log('Fetching new episodes for Podcast subscriptions.....');
      getNewEpisodes();
    });
  },

  init: function () {
    SIREN.scheduleJob();
  }
};

(function () {
  SIREN.init();
})();
