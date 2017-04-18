var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/db.js')[env];
var chalk     = require('chalk');
var models    = require('../models');
//var pg        = require('pg');


models.sequelize.sync({force: true}).then(function () {
  console.log(chalk.green('Initialized the ' + env + ' database: ' + config.database));
  models.sequelize.close();
  return null;
}).catch(function (error) {
  console.error(chalk.red(error.message));
});

// const pool = new pg.Pool(config);
// pool.query('SELECT * FROM "Podcasts"', function (err, res) {
//   if(err) {
//     return console.error(chalk.red('error running query', err));
//   }
//   console.log(res);
// });
// pool.query('CREATE VIEW "Inbox" AS (SELECT "Users"."username", "Users"."email", "Users"."avatarUrl", "Podcasts"."id" as "PodcastId", "Podcasts"."name", "Podcasts"."artistName", "Podcasts"."feedUrl", "Podcasts"."primaryGenreName", "Podcasts"."artworkUrl", "Podcasts"."artworkUrl600", "Episodes"."id" as "EpisodeId", "Episodes"."title", "Episodes"."description", "Episodes"."length", "Episodes"."releaseDate", "Episodes"."url" FROM "Podcasts", "Episodes", "UserPodcasts", "UserEpisodes", "Users" WHERE "Users"."id" = "UserPodcasts"."UserId" AND "Podcasts"."id" = "UserPodcasts"."PodcastId" AND "Users"."id" = "UserEpisodes"."UserId" AND "Episodes"."id" = "UserEpisodes"."EpisodeId" AND "Episodes"."PodcastId" = "Podcasts"."id");', function (err, res) {
//   if(err) {
//     return console.error(chalk.red('error running query', err));
//   }

//   console.log(res);
// });
