/* eslint-env chai, mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
const Job = require('../models/Job');

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

describe('POST /job', () => {

  beforeEach(async () => {
    await Job.remove({});
  });

  const data = {
    postCode: 123123,
    email: 'test@test.com',
    customerName: 'Testi Testinen',
    mobileNumber: '+34123123',
    description: 'Testing this.',
    category: '1'
  };

  it('Should return the created job', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job`)
      .set('app_id', 'maybe-jwt-is-better')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('new');
        done();
      });
  });
});
