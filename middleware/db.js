var db        = require('../models');

var Podcast           = require('../models/podcast')(db.sequelize, db.Sequelize);
var Episode           = require('../models/episode')(db.sequelize, db.Sequelize);
var Playlist          = require('../models/playlist')(db.sequelize, db.Sequelize);
var User              = require('../models/user')(db.sequelize, db.Sequelize);
var UserPodcast       = require('../models/userpodcast')(db.sequelize, db.Sequelize);
var UserEpisode       = require('../models/userepisode')(db.sequelize, db.Sequelize);
var PlaylistEpisode   = require('../models/playlistepisode')(db.sequelize, db.Sequelize);

module.exports = {
  db: db,
  Podcast: Podcast,
  Episode: Episode,
  Playlist: Playlist,
  User: User,
  UserPodcast: UserPodcast,
  UserEpisode: UserEpisode,
  PlaylistEpisode: PlaylistEpisode
};
