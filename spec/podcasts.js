/* globals describe it */

var app = require('../server');
const chalk = require('chalk');
const config = require('../config/config');
var helpers = require('./helpers');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[PODCASTS]   /api/podcasts/feeds', function () {

  it('GET : should return a feed for a given podcast when provided the url via querystring', function (done) {
    this.timeout(5000);
    request(app)
      .get('/api/podcasts/feeds')
      .set('Authorization', helpers.authorization)
      .query({url: helpers.iTunesPodcastObjects['The Tim Ferris Show'].feedUrl})
      .expect(200)
      .end(function (err, res) {
        var body = JSON.parse(res.text);
        if (config.debug) {
          console.log(chalk.blue.bold('Item at index 0:'));
          console.log(chalk.white(JSON.stringify(body[0], null, 2)));
        }
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
        expect(body[0]).to.have.property('title');
        done();
      });
  });

});

describe('[PODCASTS]   /api/podcasts/', function () {

  it('POST : should add a podcast subscription', function (done) {
    this.timeout(5000);
    request(app)
      .post('/api/podcasts/')
      .set('Authorization', helpers.authorization)
      .send(helpers.iTunesPodcastObjects['The Tim Ferris Show'])
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        var body = res.text;
        expect(body).to.be.a('string');
        expect(body).to.contain('Subscribed');
        done();
      });
  });

  it('GET : should return a collection of podcasts the user is subscribed to', function (done) {
    this.timeout(5000);
    request(app)
      .get('/api/podcasts/')
      .set('Authorization', helpers.authorization)
      .expect(200)
      .end(function (err, res) {
        var body = JSON.parse(res.text);
        if (config.debug) {
          console.log(chalk.blue.bold('Item at index 0:'));
          console.log(chalk.white(JSON.stringify(body[0][0], null, 2)));
        }
        expect(body).to.be.an('array');
        expect(body[0][0]).to.be.an('object');
        expect(body[0][0]).to.have.property('id');
        done();
      });
  });



});

describe('[PODCASTS]   /api/podcasts/:id', function () {

  it('DELETE : should remove a podcast subscription', function (done) {
    this.timeout(5000);
    request(app)
      .delete('/api/podcasts/1')
      .set('Authorization', helpers.authorization)
      .expect(200)
      .end(function (err, res) {
        var body = JSON.parse(res.text);
        if (config.debug) {
          console.log(chalk.blue.bold('Item at index 0:'));
          console.log(chalk.white(JSON.stringify(body[0][0], null, 2)));
        }
        expect(body).to.be.an('array');
        expect(body[0][0]).to.be.an('object');
        expect(body[0][0]).to.have.property('id');
        done();
      });
    done();
  });

});

