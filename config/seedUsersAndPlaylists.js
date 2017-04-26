var db    = require('./db');
var chalk = require('chalk');

var Podcast = db.Podcast;
var Episode = db.Episode;
var Playlist = db.Playlist;
var User = db.User;
var Action = db.Action;
var UserPodcast = db.UserPodcast;
var UserEpisode = db.UserEpisode;
var PlaylistEpisode = db.PlaylistEpisode;

console.log(chalk.white.bold('Seeding the Database........'));

setTimeout(function () {
  seedData();
}, 2000);

var seedData = function () {
  console.log(chalk.white('Dropping and re-creating tables'));
  User.sync({force: true})
  .then(() => Podcast.sync({force: true}))
  .then(() => Episode.sync({force: true}))
  .then(() => Playlist.sync({force: true}))
  .then(() => Action.sync({force: true}))
  .then(() => UserPodcast.sync({force: true}))
  .then(() => UserEpisode.sync({force: true}))
  .then(() => PlaylistEpisode.sync({force: true}))

  .then(() => console.log(chalk.magenta('Seeding Users')))
  .then(() => User.create({
    username: 'danyadsmith',
    email: 'danyadsmith@email.com',
    avatarUrl: 'http://portfolio.pspu.ru/uploads/avatars/noimage.png',
    password: '$2a$10$unjENmy67P14fIOkdAC0WOBN76Z4zV3wiq8XwFqHWfEUYdt1MJgYi',
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  .then(() => User.create({
    username: 'brycedooley',
    email: 'brycedooley@email.com',
    avatarUrl: 'http://portfolio.pspu.ru/uploads/avatars/noimage.png',
    password: '$2a$10$unjENmy67P14fIOkdAC0WOBN76Z4zV3wiq8XwFqHWfEUYdt1MJgYi',
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  .then(() => User.create({
    username: 'megviar',
    email: 'megviar@email.com',
    avatarUrl: 'http://portfolio.pspu.ru/uploads/avatars/noimage.png',
    password: '$2a$10$unjENmy67P14fIOkdAC0WOBN76Z4zV3wiq8XwFqHWfEUYdt1MJgYi',
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  .then(() => User.create({
    username: 'em',
    email: 'em@email.com',
    avatarUrl: 'http://portfolio.pspu.ru/uploads/avatars/noimage.png',
    password: '$2a$10$17kLnuJc/J/KEvKCro6NVOPcOCld6/jD2zwX.SOwJZ4GNbzYnIOx6',
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  .then(() => console.log(chalk.magenta('Seeding Playlists')))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 1, createdAt: new Date(), updatedAt: new Date() }))  //4
  .then(() => Playlist.create({ name: 'Listening To', UserId: 1, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 2, createdAt: new Date(), updatedAt: new Date() }))  //1
  .then(() => Playlist.create({ name: 'Listening To', UserId: 2, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 3, createdAt: new Date(), updatedAt: new Date() }))  //1
  .then(() => Playlist.create({ name: 'Listening To', UserId: 3, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 4, createdAt: new Date(), updatedAt: new Date() }))  //1
  .then(() => Playlist.create({ name: 'Listening To', UserId: 4, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Monday', UserId: 4, createdAt: new Date(), updatedAt: new Date()})) // 9
  .then(() => Playlist.create({ name: 'Tuesday', UserId: 4, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Wednesday', UserId: 4, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Thursday', UserId: 4, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Friday', UserId: 4, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Weekend', UserId: 4, createdAt: new Date(), updatedAt: new Date()})); // 14

};
