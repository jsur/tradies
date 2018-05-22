const mongoose = require('mongoose');
const Job = require('../models/Job');
const Tradie = require('../models/Tradie');

const { handleServerErrors } = require('../helpers/errorHandlers');

const isIdValid = id => mongoose.Types.ObjectId.isValid(id);

exports.addJob = async (req, res) => {
  try {
    const newJob = await new Job(req.body).save();
    res.status(200).send(newJob);
  } catch (err) {
    handleServerErrors(err, res);
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (err) {
    handleServerErrors(err, res);
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).send(job);
  } catch (err) {
    handleServerErrors(err, res);
  }
};

exports.assignTradie = async (req, res) => {
  const { jobId, tradieId } = req.body;

  if (
    jobId &&
    tradieId &&
    (isIdValid(jobId) && isIdValid(tradieId))) {
    try {
      const job = await Job.findById(jobId);
      const tradie = await Tradie.findById(tradieId);

      if (!job || !tradie) {
        res.status(400).send('Given jobId or tradieId does not exist.');
        return;
      }

      const assignedTradies = job.assignedTradies.map(item => item.toString());

      if (assignedTradies.includes(tradieId)) {
        res.status(400).send('Given tradieId is already assigned to this jobId.');
        return;
      }
      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        {
          $push: { assignedTradies: tradieId },
          status: 'assigned'
        }
      );

      const tradiesAssignedJobs = tradie.jobsAssigned.map(item => item.toString());

      if (tradie && !tradiesAssignedJobs.includes(jobId)) {
        await Tradie.findByIdAndUpdate(
          tradieId,
          { $push: { jobsAssigned: jobId } }
        );
      }

      res.status(200).send(`Tradie assigned to job ${updatedJob._id}!`);
    } catch (err) {
      handleServerErrors(err, res);
    }
  } else {
    res.status(400).send('You have to give a valid jobId and tradieId.');
  }
};
