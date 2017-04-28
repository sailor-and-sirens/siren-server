/* globals describe it */

var app = require('../server');
const chalk = require('chalk');
const config = require('../config/config');
var helpers = require('./helpers');
var request = require('supertest');
var expect = require('chai').expect;
var episodeId = null;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[EPISODES]   /api/episodes/', function () {

  it('POST : should add an episode subscription', function (done) {
    this.timeout(5000);
    request(app)
      .post('/api/episodes/')
      .set('Authorization', helpers.authorization)
      .send(helpers.episodeSubscriptions['Cheri Huber'])
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        var body = res.text;
        expect(body).to.be.a('string');
        expect(body).to.contain('Subscribed');
        expect(body).to.contain('episode');
        done();
      });
  });
});

describe('[EPISODES]   /api/episodes/:id', function () {

  //it('DELETE : should remove a podcast subscription', function (done) {
    // this.timeout(5000);
    // request(app)
    //   .delete('/api/episodes/1')
    //   .set('Authorization', helpers.authorization)
    //   .expect(200)
    //   .end(function (err, res) {
    //     var body = JSON.parse(res.text);
    //     expect(body).to.be.an('array');
    //     expect(body[0][0]).to.be.an('array');
    //     expect(body[0][1]).to.have.property('command');
    //     expect(body[0][1]).to.have.property('rowCount');
    //     done();
    //   });
    // done();
  //});

});

