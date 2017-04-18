/* globals describe it */

var app = require('../server');
const chalk = require('chalk');
const config = require('../config/config');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[PODCASTS]   /api/podasts/feeds', function () {

  it('GET : should return a feed for a given podcast when provided the url via querystring', function (done) {
    request(app)
      .get('/api/podcasts/feeds')
      .query({url: 'https://www.npr.org/rss/podcast.php?id=510298'})
      .expect(200)
      .end(function (err, res) {
        var body = JSON.parse(res.text);
        if (config.debug) {
          console.log(chalk.blue.bold('Item at index 0:'));
          console.log(chalk.white(JSON.stringify(body[0], null, 2)));
        }
        if (err) { console.error(err); }
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
        expect(body[0]).to.have.property('title');
        done();
      });
  });

});
