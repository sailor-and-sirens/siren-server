const chalk = require('chalk');
const sanitize = require('sanitize-html');
const request = require('request');
const Promise = require('bluebird');
const parsePodcast  = require('../middleware/node-podcast-parser');

var secondstotime = (secs) => {
  var t = new Date(1970,0,1);
  t.setSeconds(secs);
  var s = t.toTimeString().substr(0,8);
  if(secs > 86399)
    s = Math.floor((t - Date.parse('1/1/70')) / 3600000) + s.substr(2);
  return s;
};

var feedSanitizer = (data) => {
  return data.map((item) => {
    item.duration = secondstotime(item.duration);
    item.title = sanitize(item.title);
    if (item.description) {
      item.description = sanitize(item.description, {
        allowedTags: [/* 'a' */],
        allowedAttributes: {/* 'a': [ 'href' ] */}
      });
    } else if (item.summary) {
      item.description = sanitize(item.summary, {
        allowedTags: [/* 'a' */],
        allowedAttributes: {/* 'a': [ 'href' ] */}
      });
    } else if (item.subtitle) {
      item.description = sanitize(item.subtitle, {
        allowedTags: [/* 'a' */],
        allowedAttributes: {/* 'a': [ 'href' ] */}
      });
    } else {
      item.description = '';
    }
    delete item.summary;
    delete item.subtitle;
    if (item.duration === 'invalid') {
      item.duration = '';
    }
    return item;
  });
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
          // should this be reject(err); instead of return? -M
          reject(err);
          // return;
        }
        data = feedSanitizer(data.episodes);
        //console.log(chalk.white(JSON.stringify(data, null, 2)));
        resolve({ response: response, data: data});
      });
    });
  });
};

var mockUser = function () {
  var user = {
    id: 1,
    username: 'danyadsmith',
    email: 'danyadsmith@email.com',
    avatarUrl: 'http://portfolio.pspu.ru/uploads/avatars/noimage.png',
    password: '$2a$10$unjENmy67P14fIOkdAC0WOBN76Z4zV3wiq8XwFqHWfEUYdt1MJgYi',
    createdAt: '2017-04-15T18:23:32.674Z',
    updatedAt: '2017-04-15T18:23:32.674Z'
  };
  return user;
};

var timeToSeconds = (timeString) => {
  var hms = timeString.split(':');
  var hours = +hms[0] * 60 * 60;
  var minutes = +hms[1] * 60;
  var seconds = +hms[2];
  return hours + minutes + seconds;
};

var getTotalDuration = (episodes) => {
  var duration = 0;
  if (episodes.length === 0) return 0;
  episodes.forEach(episode => duration += timeToSeconds(episode.dataValues.length));
  return Math.floor(duration / 60);
};

module.exports = {
  feedSanitizer: feedSanitizer,
  getFeed: asyncGetFeed,
  mockUser: mockUser,
  getTotalDuration: getTotalDuration
};
