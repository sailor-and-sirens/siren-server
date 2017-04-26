//const chalk         = require('chalk');
//const config        = require('../config/config');
const sequelize     = require('../config/db');
//const utils         = require('../middleware/helpers.js');
const Promise       = require('bluebird');


var getPodcast = (podcast) => {
  return sequelize.Podcast.findOne({
    where: {
      feedUrl: podcast.feedUrl
    }
  });
};

var findOrCreatePodcast = (podcast) => {
  return getPodcast(podcast)
  .then(function (data) {
    if (data) {
      return data;
    } else {
      return createPodcast(podcast)
      .then(function (data) {
        if (data) {
          return data;
        } else {
          return;
        }
      });
    }
  });
};

var createPodcast = (podcast) => {
  return sequelize.Podcast.create(podcast);
};

var getEpisode = (podcast, episode) => {
  return sequelize.Episode.findOne({
    where: {
      title: episode.title,
      PodcastId: podcast.id
    }
  });
};

var addUserEpisode = (user, episode) => {
  return sequelize.db.query('INSERT INTO "UserEpisodes" ("UserId", "EpisodeId", "isInInbox", "createdAt", "updatedAt") VALUES (' + user.id + ', ' + episode.id + ', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
};

var addEpisodes = (feed, podcast) => {
  return Promise.each(feed.data, (episode) => {

    episode.subtitle = episode.description;
    episode.pubDate = episode.published;
    delete episode.description;
    delete episode.releaseDate;

    return getEpisode(podcast, episode)
    .then(function (data) {
      if (data) {
        return Promise.resolve();
      } else {
        if (episode && episode.enclosure) {
          return sequelize.Episode.create({
            title: episode.title,
            description: episode.description,
            length: episode.duration,
            releaseDate: episode.pubDate,
            url: episode.enclosure.url,
            PodcastId: podcast.id,
            feed: episode
          })
          .then(function (data) {
            if (data) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          })
          .catch(function (/* err */) {
            //console.log(err);
            return Promise.resolve();
          });
        }
      }
    });
  });
};

var getUserPodcast = (user, podcast) => {
  return sequelize.UserPodcast.find({
    where: {
      PodcastId: podcast.id,
      UserId: user.id
    }
  });
};

var createUserPodcast = (user, podcast) => {
  return sequelize.db.query('INSERT INTO "UserPodcasts" ("UserId", "PodcastId", "createdAt", "updatedAt") VALUES(' + user.id + ', ' + podcast.id + ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
};

var addPodcastEpisodes = (podcast, user) => {
  return sequelize.db.query('INSERT INTO "UserEpisodes" ("UserId", "EpisodeId", "isInInbox", "createdAt", "updatedAt") SELECT ' + user.id + ' as "UserId", id as "EpisodeId", true as "isInInbox", CURRENT_TIMESTAMP as "createdAt", CURRENT_TIMESTAMP as "updatedAt" FROM "Episodes" WHERE "PodcastId" = ' + podcast.id + ' ORDER BY "releaseDate" DESC LIMIT 3');
};

module.exports = {
  getPodcast: getPodcast,
  findOrCreatePodcast: findOrCreatePodcast,
  createPodcast: createPodcast,
  getUserPodcast: getUserPodcast,
  createUserPodcast: createUserPodcast,
  getEpisode: getEpisode,
  addUserEpisode: addUserEpisode,
  addEpisodes: addEpisodes,
  addPodcastEpisodes: addPodcastEpisodes

};


