var schedule = require('node-schedule');
var getNewEpisodes = require('../middleware/getNewEpisodes');

var APP = {
  scheduleJob: function () {
    rule = '0 * * * *'
    var job = schedule.scheduleJob(rule, function() {
      getNewEpisodes();
    })
  },

  init: function() {
    APP.scheduleJob();
  }
};

(function() {
  APP.init();
})();
