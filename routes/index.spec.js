/* eslint-env chai, mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');

const { expect } = chai;
const Job = require('../models/Job');
const Tradie = require('../models/Tradie');

const isIdValid = id => mongoose.Types.ObjectId.isValid(id);
const {
  ID_NOTVALID,
  ID_JOB_TRADIE_NOTFOUND,
  JOB_ALREADY_HIRED
} = require('../helpers/msg-constants');

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
        expect(res.body.customerName).to.equal('Testi Testinen');
        done();
      });
  });
});

describe('GET /jobs', () => {
  it('Should return an array of jobs', (done) => {
    chai.request(app)
      .get(`${baseUrl}/jobs`)
      .set('app_id', 'maybe-jwt-is-better')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('GET /job/:id', () => {
  let job;
  let jobId;

  beforeEach(async () => {
    job = await Job.findOne();
    jobId = job._id.toString();
  });

  it('Should return a job with given id', (done) => {
    chai.request(app)
      .get(`${baseUrl}/job/${jobId}`)
      .set('app_id', 'maybe-jwt-is-better')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(isIdValid(res.body._id)).to.equal(true);
        done();
      });
  });
});

describe('POST /job/assignTradie', () => {
  let job;
  let jobId;
  let tradie;
  let tradieId;

  beforeEach(async () => {
    job = await Job.findOne();
    jobId = job._id.toString();
    tradie = await Tradie.findOne();
    tradieId = tradie._id.toString();
  });

  it('Should assign a tradie to a job', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/assignTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({ jobId, tradieId })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(`Tradie assigned to job ${jobId}!`);
        done();
      });
  });
  it('Should not allow assigning a tradie to a job more than once', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/assignTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({ jobId, tradieId })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('Given tradieId is already assigned to this jobId.');
        done();
      });
  });
  it('Should complain about nonvalid Mongo ObjectIds', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/assignTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({
        jobId: 'aaaa',
        tradieId: 'bbbb'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(ID_NOTVALID);
        done();
      });
  });
  it('Should complain about nonexisting jobIds or tradieIds', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/assignTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({
        jobId: '5b06ac7e8b68482f8df01e30',
        tradieId: '5b06ac7e8b68482f8df01e31'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(ID_JOB_TRADIE_NOTFOUND);
        done();
      });
  });
});

describe('GET /job/:id/assignments', () => {
  let job;
  let jobId;

  beforeEach(async () => {
    job = await Job.findOne();
    jobId = job._id.toString();
  });

  it('Should return tradies assigned to a jobId', (done) => {
    chai.request(app)
      .get(`${baseUrl}/job/${jobId}/assignments`)
      .set('app_id', 'maybe-jwt-is-better')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(isIdValid(res.body[0]._id)).to.equal(true);
        done();
      });
  });
  it('Should complain about a nonvalid jobId', (done) => {
    chai.request(app)
      .get(`${baseUrl}/job/asdfasdf/assignments`)
      .set('app_id', 'maybe-jwt-is-better')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(ID_NOTVALID);
        done();
      });
  });
});

describe('POST /job/hireTradie', () => {
  let job;
  let jobId;
  let tradie;
  let tradieId;

  beforeEach(async () => {
    job = await Job.findOne();
    jobId = job._id.toString();
    tradie = await Tradie.findOne();
    tradieId = tradie._id.toString();
  });

  it('Should mark a tradie as hired for a job', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/hireTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({ jobId, tradieId })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(`Tradie ${tradieId} hired to job!`);
        done();
      });
  });
  it('Should not allow changing the hired tradie', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/hireTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({ jobId, tradieId })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(JOB_ALREADY_HIRED);
        done();
      });
  });
  it('Should complain about invalid ids', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/hireTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({
        jobId: 'aaaa',
        tradieId: 'bbbb'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(ID_NOTVALID);
        done();
      });
  });
  it('Should complain about nonexisting ids', (done) => {
    chai.request(app)
      .post(`${baseUrl}/job/hireTradie`)
      .set('app_id', 'maybe-jwt-is-better')
      .send({
        jobId: '5b07bffb8d37ec4034a7b35a',
        tradieId: '5b07bffb8d37ec4034a7b35b'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(ID_JOB_TRADIE_NOTFOUND);
        done();
      });
  });
});

after(async () => {
  await Job.remove();
  await Tradie.remove();
});
