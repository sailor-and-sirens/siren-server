var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/db.js')[env];
var db;

//initialize Sequelize with postgres with remote url
if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres', logging: false });
} else {
  // otherwise initialize Sequelize with postgres on your local machine
  db = new Sequelize(config.database, process.env.POSTGRES_USER, '', {dialect: 'postgres', logging: false });
}

var Podcast = db.define('Podcast', {
  collectionId: Sequelize.INTEGER,
  artistId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  feedUrl: Sequelize.STRING,
  primaryGenreName: Sequelize.STRING,
  artworkUrl: Sequelize.STRING,
  artworkUrl600: Sequelize.STRING
});

var Episode = db.define('Episode', {
  title: Sequelize.STRING,
  creator: Sequelize.STRING,
  description: Sequelize.STRING,
  length: Sequelize.TIME,
  releaseDate: Sequelize.DATEONLY,
  category: Sequelize.STRING
});

var Playlist = db.define('Playlist', {
  name: Sequelize.STRING
});

var User = db.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  avatarUrl: Sequelize.STRING
});

var UserEpisode = db.define('UserEpisode', {
  userId: Sequelize.INTEGER,
  episodeId: Sequelize.INTEGER,
  bookmarked: Sequelize.BOOLEAN,
  liked: Sequelize.BOOLEAN,
  currentTime: Sequelize.TIME,
  lastPlayed: Sequelize.DATE
});

var UserPodcast = db.define('UserPodcast', {
  userId: Sequelize.INTEGER,
  podcastId: Sequelize.INTEGER
});

var PlaylistEpisode = db.define('PlaylistEpisode', {});

module.exports = {
  Podcast: Podcast,
  Episode: Episode,
  Playlist: Playlist,
  User: User,
  UserEpisode: UserEpisode,
  UserPodcast: UserPodcast,
  PlaylistEpisode: PlaylistEpisode
};
