const mongoose = require('mongoose');
const Job = require('../models/Job');
const Tradie = require('../models/Tradie');

const { handleServerErrors } = require('../helpers/errorHandlers');

const {
  ID_NOTVALID,
  JOB_NOT_FOUND,
  ID_JOB_TRADIE_NOTFOUND 
} = require('../helpers/msg-constants');

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
  const { id } = req.params;
  if (isIdValid(id)) {
    try {
      const job = await Job.findById(id);
      if (job) {
        res.status(200).send(job);
        return;
      }
      res.status(400).send(JOB_NOT_FOUND);
    } catch (err) {
      handleServerErrors(err, res);
    }
  } else {
    res.status(400).send(ID_NOTVALID);
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
        res.status(400).send(ID_JOB_TRADIE_NOTFOUND);
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
    res.status(400).send(ID_NOTVALID);
  }
};

exports.getJobAssignments = async (req, res) => {
  const { id } = req.params;
  if (isIdValid(id)) {
    try {
      const assignments = await Job.findOne({ _id: id }, { _id: 0, assignedTradies: 1 });
      if (assignments) {
        const tradies = await Tradie.find({
          _id: {
            $in: assignments.assignedTradies
          }
        });
        res.status(200).send(tradies);
        return;
      }
      res.status(400).send(JOB_NOT_FOUND);
    } catch (err) {
      handleServerErrors(err);
    }
  } else {
    res.status(400).send(ID_NOTVALID);
  }
};
