const Job = require('../models/Job');

const { getServerErrors, handleServerErrors } = require('../helpers/errorHandlers'); 

exports.addJob = async (req, res) => {
  try {
    const newJob = await new Job(req.body).save();
    res.status(200).send(newJob);
  } catch (err) {
    const errors = getServerErrors(err);
    handleServerErrors(err, errors, res);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (err) {
    const errors = getServerErrors(err);
    handleServerErrors(err, errors, res);
  }
};
