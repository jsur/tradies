const Job = require('../models/Job');

const { getServerErrors } = require('../helpers/errorHandlers'); 
const { log } = require('../helpers/logger');

exports.addJob = async (req, res) => {
  try {
    const newJob = await new Job(req.body).save();
    res.status(200).send(newJob);
  } catch (err) {
    const errors = getServerErrors(err);
    if (errors.ValidatorError) {
      res.status(400).send(errors);
      return;
    }
    log.info(err);
    res.sendStatus(500);
  }
};
