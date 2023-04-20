const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
})

const User = mongoose.model('User', UserSchema)

const vitalHistory = {
  vitalHistories: [{
    _id: false,
    bodyTemperature: {
      type: Number,
      required: true
    },
    heartRate: {
      type: Number,
      required: true
    },
    bloodPressure: {
      systolic: {
        type: Number,
        required: true
      },
      diastolic: {
        type: Number,
        required: true
      }
    },
    respiratoryRate: {
      type: Number,
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  motivationalTips: [{
    _id: false,
    tip: {
      type: String,
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Nurse'
    }
  }]
}

const Nurse = User.discriminator('Nurse', new mongoose.Schema())
const Patient = User.discriminator('Patient', new mongoose.Schema(vitalHistory))