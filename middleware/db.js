'use strict';

const chalk     = require('chalk');
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config');
const dbConfig  = require(__dirname + '/../config/db.js')[env];
var db          = null;

if (dbConfig.use_env_variable) {
  db = new Sequelize('postgres:/aqcsysjrixrhym:499b89fc9cf873dde71f8fcbe52d5fd3cab6ccd066a6b8b16205f56d9dab8d97@ec2-54-163-246-154.compute-1.amazonaws.com:5432/dec48n2kkdjcg0?ssl=true', {'dialect':'postgres', 'ssl':true, 'dialectOptions':{'ssl':{'require':true}}});
} else {
  db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

var Podcast = db.define('Podcast', {
  collectionId: Sequelize.INTEGER,
  artistId: Sequelize.INTEGER,
  artistName: Sequelize.STRING,
  name: Sequelize.STRING,
  feedUrl: Sequelize.STRING,
  primaryGenreName: Sequelize.STRING,
  artworkUrl: Sequelize.STRING,
  artworkUrl600: Sequelize.STRING
});

var Episode = db.define('Episode', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  length: Sequelize.TIME,
  releaseDate: Sequelize.DATEONLY,
  url: Sequelize.STRING
});

var Playlist = db.define('Playlist', {
  name: Sequelize.STRING
});

var User = db.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  avatarUrl: Sequelize.STRING,
  password: Sequelize.STRING
});

var UserPodcast = db.define('UserPodcast', {
  UserId: Sequelize.INTEGER,
  PodcastId: Sequelize.INTEGER
});

var UserEpisode = db.define('UserEpisode', {
  bookmarked: Sequelize.BOOLEAN,
  liked: Sequelize.BOOLEAN,
  isInInbox: Sequelize.BOOLEAN,
  currentTime: Sequelize.INTEGER, // changed from Time b/c data will be milliseconds
  lastPlayed: Sequelize.DATE
});

var Action = db.define('Action', {
  actionType: Sequelize.STRING,
  actionMsg: Sequelize.STRING
});

var PlaylistEpisode = db.define('PlaylistEpisode', {});

User.belongsToMany(Podcast, {through: 'UserPodcasts', onDelete: 'CASCADE'});
User.belongsToMany(Episode, {through: 'UserEpisodes', as: 'Inbox', onDelete: 'CASCADE'});
User.hasMany(Playlist);
User.hasMany(Action);
Podcast.belongsToMany(User, {through: 'UserPodcasts', onDelete: 'CASCADE'});
Podcast.hasMany(Episode);
Podcast.hasMany(Action);
Episode.belongsTo(Podcast, {onDelete: 'CASCADE'});
Episode.belongsToMany(Playlist, {through: 'PlaylistEpisodes', onDelete: 'CASCADE'});
Episode.belongsToMany(User, {through: UserEpisode});
Episode.hasMany(Action);
Playlist.belongsTo(User);
Playlist.belongsToMany(Episode, {through: PlaylistEpisode});

db.sync({force: true}).then(function () {
  if (config.debug) {
    console.log(chalk.green('Initialized the ' + env + ' database: ' + dbConfig.database));
  }
  return null;
}).catch(function (error) {
  console.error(chalk.red(error.message));
});

module.exports = {
  db: db,
  Sequelize: Sequelize,
  Podcast: Podcast,
  Episode: Episode,
  Playlist: Playlist,
  User: User,
  UserPodcast: UserPodcast,
  UserEpisode: UserEpisode,
  PlaylistEpisode: PlaylistEpisode,
  Action: Action
};
