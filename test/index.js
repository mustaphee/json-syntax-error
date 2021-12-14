/* eslint-disable no-undef */
const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const JSONSyntaxError = require('..');

// Configure chai
chai.use(chaiHttp);
chai.should();

const { expect } = chai;

function bootStrapApp() {
  const app = express();
  app.use(express.json());
  app.use(JSONSyntaxError());
  app.post('/', (req, res) => res.send({ body: req.body }));
  app.listen(7338);
  return app;
}

describe('Test JSON Syntax Error Middleware', () => {
  before(function () {
    this.app = chai.request(bootStrapApp()).keepOpen();
  });

  it('should return your parsed request body', function (done) {
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

  it('should throw an parsed error,', function (done) {
    this.app
      .post('/')
      .set('Content-Type', 'application/json')
      .send('World')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Invalid JSON: The server is unable to process your request as it is badly malformed!');
        done();
      });
  });

  after(function () {
    this.app.close();
  });
});
