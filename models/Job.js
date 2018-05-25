const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new mongoose.Schema(
  {
    postCode: {
      type: Number,
      required: [true, 'postCode is required']
    },
    category: {
      type: String,
      required: [true, 'category is required']
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'description is required']
    },
    customerName: {
      type: String,
      trim: true,
      required: [true, 'customerName is required']
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required']
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: [true, 'mobileNumber is required']
    },
    status: {
      type: String,
      enum: ['new', 'assigned', 'hired'],
      default: 'new'
    },
    assignedTradies: {
      type: [Schema.Types.ObjectId],
      ref: 'Tradie',
      default: []
    },
    hiredTradie: {
      type: Schema.Types.ObjectId,
      ref: 'Tradie',
      default: null
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
