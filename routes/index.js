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

router.post(`${base}${apiV1}/job`, authController.checkAuth, jobController.addJob);

module.exports = router;
