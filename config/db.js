const chalk = require('chalk');
const config = require('./config');
const Postgres = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.dbName, config.POSTGRES_USER, config.POSTGRES_PWD, {
  dialect: 'postgres'
});

console.log(chalk.green.bold('PostgreSQL connection established successfully!'));
console.log(chalk.green('PostgreSQL Using Database: ', config.dbName));
