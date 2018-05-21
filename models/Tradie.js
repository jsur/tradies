const mongoose = require('mongoose');

const { Schema } = mongoose;

const tradieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    mobile: {
      type: String,
      required: [true, 'Mobile is required']
    },
    jobsAssigned: {
      type: [Schema.Types.ObjectId],
      ref: 'Job'
    },
    jobsHired: {
      type: [Schema.Types.ObjectId],
      ref: 'Job'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Tradie = mongoose.model('Tradie', tradieSchema);

module.exports = Tradie;
