/* eslint-disable no-undef */
const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const resolveSyntaxError = require('./index');

// Configure chai
chai.use(chaiHttp);
chai.should();

const { expect, assert } = chai;

function bootStrapApp() {
  const app = express();
  app.use(express.json());
  app.post('/', function(req, res){ return res.status(200).send({ body: req.body }) });
  app.listen(7338);
  return app
}


describe('Test Resolve Syntax Error Middleware', function() {
  before(function() {
    this.app = chai.request(bootStrapApp()).keepOpen();
  });

    it('should return your parsed request body', function(done) {
      this.app
        .post('/')
        .set('Content-Type', 'application/json')
        .send({ hello: 'World' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('body');
          expect(res.body.body.hello).to.equal('World');
          done();
        });
    });

  // Add a failing text

  after(function() {
     this.app.close();
  });
});
