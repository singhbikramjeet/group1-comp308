const Patient = require('mongoose').model('Patient')

const authPatient = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await Patient.findOne({ _id: req.user.id })
    if (user.role !== 0)
      return res.status(400).json({ msg: "Patient resources access denied" })
      
    next()
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = authPatient