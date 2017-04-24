//const chalk         = require('chalk');
//const config        = require('../config/config');
const sequelize     = require('../config/db');
const helpers       = require('../middleware/helpers.js');
//const parsePodcast  = require('../middleware/node-podcast-parser');
//const request       = require('request');
//const Promise       = require('bluebird');
const moment        = require('moment');
const subscribe     = require('../controllers/episodeController.js').subscribe;

module.exports = {

  getNewEpisodes: () => {
    sequelize.Podcast.findAll()
    .then((podcasts) => {
      podcasts.forEach((podcast) => {
        console.log('Getting new episodes of ', podcast.name);
        let newEpisodes = [];
        let lastTitle = null;
        let lastDate = null;
        let feedUrl = podcast.feedUrl;
        sequelize.Episode.max('id', {where:{PodcastId: podcast.id}})
        .then((id) => {
          if (id) {
            return sequelize.Episode.findOne({where:{id: id}})
            .then((lastEpisode) => {

              lastTitle = lastEpisode.title;
              lastDate = parseInt(moment(lastEpisode.releaseDate).format('YYMMDD'));

              return helpers.getFeed(feedUrl);
            });
          } else {
            return helpers.getFeed(feedUrl);
          }
        })
        .then((feed) => {
          feed = feed.data;
          feed.forEach((episode) => {
            let published = parseInt(moment(episode.published).format('YYMMDD'));
            if (episode.title !== lastTitle && lastDate <= published) {
              newEpisodes.push(episode);
            }
          });
          return sequelize.UserPodcast.findAll({where: {PodcastId: podcast.id}});
        })
        .then((records) => {
          if (records) {
            records.forEach((record) => {
              newEpisodes.forEach((newEpisode) => {
                subscribe({user: {id: record.dataValues.UserId, username: 'another user'}, body: {helper: true, episode: newEpisode, podcast: podcast.dataValues}});
              });
            });
          } else {
            console.log('No subscribed users found.');
          }
        });
      });
    });
  }

};
