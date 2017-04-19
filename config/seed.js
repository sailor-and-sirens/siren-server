var db    = require('./db');
var chalk = require('chalk');

var Podcast = db.Podcast;
var Episode = db.Episode;
var Playlist = db.Playlist;
var User = db.User;
var Action = db.Action;

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
  .then(() => console.log(chalk.magenta('Seeding Podcasts')))
  .then(() => Podcast.create({
    'collectionId': 863897795,
    'artistId': 867667252,
    'artistName': 'Tim Ferriss: Bestselling Author, Human Guinea Pig',
    'name': 'The Tim Ferriss Show',
    'feedUrl': 'http://feeds.feedburner.com/thetimferrissshow',
    'primaryGenreName': 'Investing',
    'artworkUrl': 'http://is4.mzstatic.com/image/thumb/Music62/v4/af/3d/b8/af3db8f5-a0d2-db36-2d52-4cbb60d431cf/source/100x100bb.jpg',
    'artworkUrl600': 'http://is4.mzstatic.com/image/thumb/Music62/v4/af/3d/b8/af3db8f5-a0d2-db36-2d52-4cbb60d431cf/source/600x600bb.jpg',
    'createdAt': new Date(),
    'updatedAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': 908489268,
    'artistName': 'Relay FM',
    'artworkUrl': 'http://is1.mzstatic.com/image/thumb/Music62/v4/70/db/74/70db746f-40ff-93ff-25ed-4202189a68ec/source/100x100bb.jpg',
    'artworkUrl600': 'http://is1.mzstatic.com/image/thumb/Music62/v4/70/db/74/70db746f-40ff-93ff-25ed-4202189a68ec/source/600x600bb.jpg',
    'collectionId': 458066753,
    'feedUrl': 'https://www.relay.fm/mpu/feed',
    'name': 'Mac Power Users',
    'primaryGenreName': 'Gadgets',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': null,
    'artistName': 'Odyssey SF/F Workshop',
    'artworkUrl': 'http://is2.mzstatic.com/image/thumb/Music62/v4/bc/5e/0e/bc5e0e82-fb1d-d8e9-85ce-1d2e128a76fb/source/100x100bb.jpg',
    'artworkUrl600': 'http://is2.mzstatic.com/image/thumb/Music62/v4/bc/5e/0e/bc5e0e82-fb1d-d8e9-85ce-1d2e128a76fb/source/600x600bb.jpg',
    'collectionId': 213992784,
    'feedUrl': 'http://www.odysseyworkshop.org/odysseypodcasts.xml',
    'name': 'Odyssey SF/F Writing Workshop Podcasts',
    'primaryGenreName': 'Literature',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': 1019380766,
    'artistName': 'Spec',
    'artworkUrl': 'http://is1.mzstatic.com/image/thumb/Music62/v4/fe/c7/2a/fec72adb-c148-d109-fcd3-9a9b129a0824/source/100x100bb.jpg',
    'artworkUrl600': 'http://is1.mzstatic.com/image/thumb/Music62/v4/fe/c7/2a/fec72adb-c148-d109-fcd3-9a9b129a0824/source/600x600bb.jpg',
    'collectionId': 955596067,
    'feedUrl': 'http://feeds.feedburner.com/DeveloperTea',
    'name': 'Developer Tea',
    'primaryGenreName': 'Software How-To',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': 391030532,
    'artistName': '5by5',
    'artworkUrl': 'http://is1.mzstatic.com/image/thumb/Music62/v4/08/2e/51/082e5177-0fb1-8d39-3330-3a91e68d1bcd/source/100x100bb.jpg',
    'artworkUrl600': 'http://is1.mzstatic.com/image/thumb/Music62/v4/08/2e/51/082e5177-0fb1-8d39-3330-3a91e68d1bcd/source/600x600bb.jpg',
    'collectionId': 370445683,
    'feedUrl': 'http://feeds.5by5.tv/bigwebshow',
    'name': 'The Big Web Show',
    'primaryGenreName': 'Software How-To',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': null,
    'artistName': 'Dave Rael',
    'artworkUrl': 'http://is3.mzstatic.com/image/thumb/Music122/v4/24/7c/e4/247ce4ec-6d3e-297a-b8c9-2cb0ea454e29/source/100x100bb.jpg',
    'artworkUrl600': 'http://is3.mzstatic.com/image/thumb/Music122/v4/24/7c/e4/247ce4ec-6d3e-297a-b8c9-2cb0ea454e29/source/600x600bb.jpg',
    'collectionId': 1006105326,
    'feedUrl': 'http://developeronfire.com/rss.xml',
    'name': 'Developer On Fire',
    'primaryGenreName': 'Software How-To',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': 125443881,
    'artistName': 'NPR',
    'artworkUrl': 'http://is5.mzstatic.com/image/thumb/Music71/v4/21/3a/3e/213a3e55-3264-653c-7fda-b8ef4dc39bbf/source/100x100bb.jpg',
    'artworkUrl600': 'http://is5.mzstatic.com/image/thumb/Music71/v4/21/3a/3e/213a3e55-3264-653c-7fda-b8ef4dc39bbf/source/600x600bb.jpg',
    'collectionId': 523121474,
    'feedUrl': 'https://www.npr.org/rss/podcast.php?id=510298',
    'name': 'TED Radio Hour',
    'primaryGenreName': 'Technology',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': 125443881,
    'artistName': 'NPR',
    'artworkUrl': 'http://is4.mzstatic.com/image/thumb/Music62/v4/82/3a/ad/823aad15-7ae8-2c12-240a-6658b165c978/source/100x100bb.jpg',
    'artworkUrl600': 'http://is4.mzstatic.com/image/thumb/Music62/v4/82/3a/ad/823aad15-7ae8-2c12-240a-6658b165c978/source/600x600bb.jpg',
    'collectionId': 214089682,
    'feedUrl': 'https://www.npr.org/rss/podcast.php?id=381444908',
    'name': 'Fresh Air',
    'primaryGenreName': 'Arts',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': null,
    'artistName': 'Changelog Media',
    'artworkUrl': 'http://is3.mzstatic.com/image/thumb/Music91/v4/c7/82/86/c782868c-90da-34f1-ed45-d6b9e934168e/source/100x100bb.jpg',
    'artworkUrl600': 'http://is3.mzstatic.com/image/thumb/Music91/v4/c7/82/86/c782868c-90da-34f1-ed45-d6b9e934168e/source/600x600bb.jpg',
    'collectionId': 1209616598,
    'feedUrl': 'https://changelog.com/jsparty/feed',
    'name': 'JS Party',
    'primaryGenreName': 'Software How-To',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => Podcast.create({
    'artistId': null,
    'artistName': 'Kent C. Dodds',
    'artworkUrl': 'http://is5.mzstatic.com/image/thumb/Music71/v4/98/35/96/983596ed-f37c-b42a-7316-ad45fcdebca1/source/100x100bb.jpg',
    'artworkUrl600': 'http://is5.mzstatic.com/image/thumb/Music71/v4/98/35/96/983596ed-f37c-b42a-7316-ad45fcdebca1/source/600x600bb.jpg',
    'collectionId': 1066446588,
    'feedUrl': 'http://audio.javascriptair.com/feed/',
    'name': 'JavaScript Air',
    'primaryGenreName': 'Podcasting',
    'updatedAt': new Date(),
    'createdAt': new Date()
  }))
  .then(() => console.log(chalk.magenta('Seeding Playlists')))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 1, createdAt: new Date(), updatedAt: new Date() }))  //1
  .then(() => Playlist.create({ name: 'Listening To', UserId: 1, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 2, createdAt: new Date(), updatedAt: new Date() }))  //1
  .then(() => Playlist.create({ name: 'Listening To', UserId: 2, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 3, createdAt: new Date(), updatedAt: new Date() }))  //1
  .then(() => Playlist.create({ name: 'Listening To', UserId: 3, createdAt: new Date(), updatedAt: new Date()}))
  .then(() => Playlist.create({ name: 'Bookmarks', UserId: 4, createdAt: new Date(), updatedAt: new Date() }))  //1
  .then(() => Playlist.create({ name: 'Listening To', UserId: 4, createdAt: new Date(), updatedAt: new Date()}));
};
