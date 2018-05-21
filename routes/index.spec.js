/* eslint-env chai, mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

const baseUrl = '/api/v1';

describe('GET /ping', () => {
  it('Should return the string "pong!"', (done) => {
    chai.request(app)
      .get(`${baseUrl}/ping`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('pong!');
        done();
      });
  });
});
