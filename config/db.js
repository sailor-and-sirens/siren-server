'use strict';

const chalk     = require('chalk');
const Sequelize = require('sequelize');
const config    = require('./config');
var db          = null;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres', logging: false });
} else {
  db = new Sequelize(config.dbName, config.dbUser, config.dbPwd, {dialect: 'postgres', logging: false });
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

User.belongsToMany(Podcast, {through: UserPodcast, onDelete: 'CASCADE'});
User.belongsToMany(Episode, {through: UserEpisode, onDelete: 'CASCADE'});
User.hasMany(Playlist);
User.hasMany(Action);
Podcast.belongsToMany(User, {through: UserPodcast, onDelete: 'CASCADE'});
Podcast.hasMany(Episode);
Podcast.hasMany(Action);
Episode.belongsTo(Podcast, {onDelete: 'CASCADE'});
Episode.belongsToMany(Playlist, {through: PlaylistEpisode, onDelete: 'CASCADE'});
Episode.belongsToMany(User, {through: UserEpisode, onDelete: 'CASCADE'});
Episode.hasMany(Action);
Playlist.belongsTo(User);
Playlist.belongsToMany(Episode, {through: PlaylistEpisode, onDelete: 'CASCADE'});

db.sync({force: true}).then(function () {
  if (config.debug) {
    console.log(chalk.green('Initialized the ' + config.dbEnv + ' database: ' + config.dbName));
  }
  return null;
}).catch(function (error) {
  console.error(chalk.red(Object.keys(error)));
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
