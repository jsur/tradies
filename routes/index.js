const express = require('express');
const jobController = require('../controllers/jobsController');
const authController = require('../controllers/authController');

const router = express.Router();
const base = '/api';
const apiV1 = '/v1';

/**
 * @api {get} /ping Ping server
 * @apiVersion 0.1.0
 * @apiName tradie-challenge
 * @apiGroup Helpers
 *
 * @apiSuccess {String} pong pong!
 * @apiSuccessExample {String} Example success:
 * pong!
 */
router.get(`${base}${apiV1}/ping`, (req, res) => {
  res.send('pong!');
});

/**
 * @api {post} /job Create new job
 * @apiVersion 0.1.0
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
 * @api {get} /job/:id/assignments Get tradies assigned to a job id
 * @apiVersion 0.1.0
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiSuccess {Array} Tradies Tradies assigned to a job
 * @apiSuccessExample {Array} Example success:
[
    {
        "jobsAssigned": [
            "5b07bffb8d37ec4034a7b35a"
        ],
        "jobsHired": [],
        "_id": "5b07bffb8d37ec4034a7b35c",
        "name": "Tradie Number 1",
        "email": "tradie@johndoe.com",
        "mobile": "123123123",
        "__v": 0,
        "created_at": "2018-05-25T07:49:15.307Z",
        "updated_at": "2018-05-25T07:51:09.941Z"
    },
    {
        "jobsAssigned": [
            "5b07bffb8d37ec4034a7b35a"
        ],
        "jobsHired": [],
        "_id": "5b07bffb8d37ec4034a7b35d",
        "name": "John Tradie",
        "email": "hello@hotmail.com",
        "mobile": "777 888 999",
        "__v": 0,
        "created_at": "2018-05-25T07:49:15.307Z",
        "updated_at": "2018-05-25T07:51:42.341Z"
    }
]
 *
 * @apiError {Object} Error Error object
 */
router.get(`${base}${apiV1}/job/:id/assignments`, authController.checkAuth, jobController.getJobAssignments);

/**
 * @api {get} /job/:id Get one job by Mongo id
 * @apiVersion 0.1.0
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiSuccess {Array} Job Retrieved job by id
 * @apiSuccessExample {Array} Example success:
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
 * @apiVersion 0.1.0
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiSuccess {Array} Jobs All job objects
 * @apiSuccessExample {Array} Example success:
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
 * @apiVersion 0.1.0
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
 * @apiErrorExample {String} Example error:
 * "You have to give a valid jobId and tradieId."
 */
router.post(`${base}${apiV1}/job/assignTradie`, authController.checkAuth, jobController.assignTradie);

/**
 * @api {post} /job/hireTradie Hire a tradie for a job
 * @apiVersion 0.1.0
 * @apiName tradie-challenge
 * @apiGroup Jobs
 *
 * @apiParamExample {json} Example request:
 *  {
 *    "jobId": "5b06ac7e8b68482f8df01e30",
 *    "tradieId": "5b06ac7e8b68482f8df01e31",
 *  }
 *
 * @apiSuccess {String} Text Tradie 5b06ac7e8b68482f8df01e31 hired to job!
 *
 * @apiError {String} Error Error text
 * @apiErrorExample {String} Example error:
 * "Job already has a tradie hired."
 */
router.post(`${base}${apiV1}/job/hireTradie`, authController.checkAuth, jobController.hireTradie);

module.exports = router;
