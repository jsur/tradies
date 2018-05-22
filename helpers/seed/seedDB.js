const Tradie = require('../../models/Tradie');
const Job = require('../../models/Job');
const { log } = require('../logger');

const jobs = [
  {
    postCode: '123123',
    email: 'test@test.com',
    customerName: 'Big Customer Co.',
    mobileNumber: '+34123123',
    description: 'Testing this.',
    category: '1'
  },
  {
    postCode: '123123',
    email: 'test123@test123.com',
    customerName: 'Another Seed Customer',
    mobileNumber: '+345555555',
    description: 'Some more testing.',
    category: '2'
  }
];

const tradies = [
  {
    name: 'Tradie Number 1',
    email: 'tradie@johndoe.com',
    mobile: '123123123'
  },
  {
    name: 'John Tradie',
    email: 'hello@hotmail.com',
    mobile: '777 888 999'
  }
];

exports.seedData = async () => {
  await Job.remove();
  const seededJobs = await Job.insertMany(jobs);
  await Tradie.remove();
  const seededTradies = await Tradie.insertMany(tradies);
  log.info(`Seeded ${seededJobs.length} jobs and ${seededTradies.length} tradies into db`);
};
