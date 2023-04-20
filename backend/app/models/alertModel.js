const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlertSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Alert = mongoose.model('Alert', AlertSchema)