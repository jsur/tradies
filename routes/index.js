const express = require('express');
const jobController = require('../controllers/jobsController');
const authController = require('../controllers/authController');

const router = express.Router();
const base = '/api';
const apiV1 = '/v1';

/**
 * @api {get} /ping Ping server
 * @apiName tradie-challenge
 * @apiGroup Helpers
 *
 * @apiSuccess {String} pong pong!
 */
router.get(`${base}${apiV1}/ping`, (req, res) => {
  res.send('pong!');
});

/**
 * @api {post} /job Create new job
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiParamExample {json} Example request:
 *  {
 *    "postCode": 123123,
 *    "email": "test@test.com",
 *    "customerName": "Tester McTest",
 *    "mobileNumber": "+34123123",
 *    "description": "Testing this.",
 *    "category": "1"
 *  }
 *
 * @apiSuccess {Object} Job Created job object
 * @apiSuccessExample {json} Example success:
 * {
 *   "status": "new",
 *   "assignedTradies": [],
 *   "_id": "5b030743f763770ea619d813",
 *   "postCode": 123123,
 *   "email": "test@test.com",
 *   "customerName": "Tester McTest",
 *   "mobileNumber": "+34123123",
 *   "description": "Testing this.",
 *   "category": "1",
 *   "created_at": "2018-05-21T17:52:03.310Z",
 *   "updated_at": "2018-05-21T17:52:03.310Z",
 *   "__v": 0
}
 *
 * @apiError {Object} Error Error object
 * @apiErrorExample {json} Example error:
 * {
 *   "ValidatorError": [
 *     "mobileNumber is required",
 *     "description is required"
 *   ]
 * }
 */
router.post(`${base}${apiV1}/job`, authController.checkAuth, jobController.addJob);

/**
 * @api {get} /jobs Get all jobs
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiSuccess {Array} Jobs All job objects
 * @apiSuccessExample {json} Example success:
 * [
 *  {
 *   "status": "new",
 *   "assignedTradies": [],
 *   "_id": "5b030743f763770ea619d813",
 *   "postCode": 123123,
 *   "email": "test@test.com",
 *   "customerName": "Tester McTest",
 *   "mobileNumber": "+34123123",
 *   "description": "Testing this.",
 *   "category": "1",
 *   "created_at": "2018-05-21T17:52:03.310Z",
 *   "updated_at": "2018-05-21T17:52:03.310Z",
 *   "__v": 0
 *  }
 * ]
 *
 * @apiError {Object} Error Error object
 */

router.get(`${base}${apiV1}/jobs`, authController.checkAuth, jobController.getJobs);

module.exports = router;
