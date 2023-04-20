const Patient = require('mongoose').model('Patient')
const Nurse = require('mongoose').model('Nurse')
const Alert = require('mongoose').model('Alert')

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password")
    return res.status(200).json(patients)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()

    Promise.all(
      alerts.map(async (alert) => {
        const patient = await Patient.findById(alert.patient)
        delete alert.patient
        return {
          ...alert._doc,
          firstName: patient.firstName,
          lastName: patient.lastName
        }
      })
    ).then(results => {
      res.status(200).json(results)
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}