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
 * @api {get} /job/:id Get one job by Mongo id
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiSuccess {Array} Job Retrieved job by id
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
router.get(`${base}${apiV1}/job/:id`, authController.checkAuth, jobController.getJob);

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
 *  },
 *  {
 *   "status": "new",
 *   "assignedTradies": [],
 *   "_id": "6c030743f353880ea123b724",
 *   "postCode": 098765,
 *   "email": "test@test.com",
 *   "customerName": "Big Customer Co.",
 *   "mobileNumber": "+34123123",
 *   "description": "Testing that.",
 *   "category": "2",
 *   "created_at": "2018-05-21T17:52:03.310Z",
 *   "updated_at": "2018-05-21T17:52:03.310Z",
 *   "__v": 0
 *  }
 * ]
 *
 * @apiError {Object} Error Error object
 */
router.get(`${base}${apiV1}/jobs`, authController.checkAuth, jobController.getJobs);

/**
 * @api {post} /job/assignTradie Assign a tradie to a job
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiParamExample {json} Example request:
 *  {
 *    "jobId": "5b06ac7e8b68482f8df01e30",
 *    "tradieId": "5b06ac7e8b68482f8df01e31",
 *  }
 *
 * @apiSuccess {String} Text Tradie assigned to job 5b06ac7e8b68482f8df01e30!
 *
 * @apiError {String} Error Error text
 * @apiErrorExample {json} Example error:
 * "You have to give a valid jobId and tradieId."
 */

router.post(`${base}${apiV1}/job/assignTradie`, authController.checkAuth, jobController.assignTradie);

module.exports = router;
