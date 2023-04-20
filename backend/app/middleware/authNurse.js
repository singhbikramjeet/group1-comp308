const Nurse = require('mongoose').model('Nurse')

const authNurse = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await Nurse.findOne({ _id: req.user.id })
    if (user.role !== 1)
      return res.status(400).json({ msg: "Nurse resources access denied" })
      
    next()
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = authNurse