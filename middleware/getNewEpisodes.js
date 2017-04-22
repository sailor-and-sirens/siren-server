const chalk         = require('chalk');
const config        = require('../config/config');
const sequelize     = require('../config/db');
const helpers       = require('../middleware/helpers.js');
const parsePodcast  = require('../middleware/node-podcast-parser');
const request       = require('request');
const Promise       = require('bluebird');
const moment        = require('moment');
const subscribe     = require('../controllers/episodeController.js').subscribe;


module.exports = {

  getNewEpisodes: (req, res) => {
    sequelize.Podcast.findAll()
    .then((podcasts) => {
      var newEpisodes = [];
      podcasts.forEach((podcast) => {
        let lastTitle = '';
        let lastDate = '';
        let feedUrl = podcast.feedUrl;
        sequelize.Episode.max('id', {where:{PodcastId: podcast.id}})
        .then((id) => {
          if (id) {
            sequelize.Episode.findOne({where:{id: id}})
            .then((episode) => {
              lastTitle = episode.title;
              lastDate = moment(episode.releaseDate).format('l');
            })
            .then(() => {
              return helpers.getFeed(feedUrl);
            })
            .then((feed) => {
              feed = feed.data;
              feed.forEach((episode) => {
                var published = moment(episode.published).format('l');
                if(episode.title !== lastTitle && (moment(lastDate).isBefore(published) || lastDate === published)) {
                  newEpisodes.push(episode);
                }
              })
            })
            .then(() => {
              return sequelize.UserPodcast.findAll({where: {PodcastId: podcast.id}})
            })
            .then((records) => {
              if (records) {
                records.forEach((record) => {
                  newEpisodes.forEach((newEpisode) => {
                    var subscribed = subscribe({user: {id: record.dataValues.UserId, username: 'another user'}, body: {helper: true, episode: newEpisode, podcast: podcast.dataValues}});
                    console.log(subscribed);
                  })
                })
              } else {console.log('No subscribed users found.');}
            })
            .catch(console.log)
          }
        })
      })
    })
  }
}