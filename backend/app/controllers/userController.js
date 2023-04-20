const config = require('../../config/config')
const User = require('mongoose').model('User')
const Patient = require('mongoose').model('Patient')
const Nurse = require('mongoose').model('Nurse')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtExpirySeconds = 3600;
const jwtKey = config.secretKey;

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body
    if(password.length < 6) return res.status(400).json({ msg: "Password should be longer." })
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: "The email already exists." })

    // Password Encryption
    const passwordHash = await bcrypt.hash(password, 10)

    var newUser = null
    if(role === "1"){
      newUser = new Nurse({...req.body, password: passwordHash})
    } else{
      newUser = new Patient({...req.body, password: passwordHash})
    }
    newUser.save()
    return res.status(200).json(newUser)

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: "User does not exist." })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" })

    //If login success, create an access token
    const token = jwt.sign({ id: user._id }, jwtKey,
      { algorithm: 'HS256', expiresIn: jwtExpirySeconds });

    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });

    return res.status(200).json({ token })

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status('200').json({ msg: 'Logged out' })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.getUserInfo = async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.newVitals = async(req, res) => {
  try {
    const {patientId, ...newVitals} = req.body

    const patient = await Patient.findById(patientId)
    patient.vitalHistories.push(newVitals)
    patient.save()

    return res.status(200).json(patient)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.newMotivationalTips = async(req, res) => {
  try {
    const {patientEmail, ...newMotivationalTips} = req.body
    
    Patient.findOne({email: req.body.patientEmail}, (err, patient) => { 
      if(patient.motivationalTips.length === 0) {
        patient.motivationalTips.push(newMotivationalTips)
        patient.save()
        console.log(patient)
      } else {
        patient.motivationalTips.pop()
        patient.motivationalTips.push(newMotivationalTips)
        patient.save()
        console.log(patient)
      }

      res.status(200).json(patient)
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}