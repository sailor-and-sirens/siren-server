const chalk = require('chalk');
const sanitize = require('sanitize-html');
const parsePodcast = require('node-podcast-parser');
const request = require('request');
const Promise = require('bluebird');

var secondstotime = (secs) => {
  var t = new Date(1970,0,1);
  t.setSeconds(secs);
  var s = t.toTimeString().substr(0,8);
  if(secs > 86399)
    s = Math.floor((t - Date.parse('1/1/70')) / 3600000) + s.substr(2);
  return s;
};

var feedSanitizer = (data) => {
  data.forEach((item) => {
    item.duration = secondstotime(item.duration);
    item.title = sanitize(item.title);
    item.description = sanitize(item.description);
  });
  return data;
};
// take in a callback function or return a promise..
var asyncGetFeed = (feedUrl) => {
  return new Promise(function (resolve, reject) {
    request(feedUrl, (err, response, data) => {
      if (err) {
        console.error(chalk.red(err));
        reject(err);
      }
      parsePodcast(data, (err, data) => {
        if (err) {
          console.error(chalk.red('Parsing error', err));
          return;
        }
        data = feedSanitizer(data.episodes);
        //console.log(chalk.white(JSON.stringify(data, null, 2)));
        resolve({ response: response, data: data});
      });
    });
  });
};

var timeToSeconds = (timeString) => {
  let hms = timeString.split(':');
  let hours = +hms[0] * 60 * 60;
  let minutes = +hms[1] * 60;
  let seconds = +hms[2];
  return hours + minutes + seconds;
};

var getTotalDuration = (episodes) => {
  let duration = 0;
  if (episodes.length === 0) return 0;
  episodes.forEach(episode => duration += timeToSeconds(episode.dataValues.length));
  return Math.floor(duration / 60);
};

module.exports = {
  feedSanitizer: feedSanitizer,
  getFeed: asyncGetFeed,
  getTotalDuration: getTotalDuration
};
