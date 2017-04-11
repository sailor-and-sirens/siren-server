var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/db.js')[env];
var chalk     = require('chalk');
var models    = require('../models');

models.sequelize.sync({force: true}).then(function () {
  console.log(chalk.green('Initialized the ' + env + ' database: ' + config.database));
  models.sequelize.close();
  return null;
}).catch(function (error) {
  console.error(chalk.red(error.message));
});
