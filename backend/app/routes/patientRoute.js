const router = require('express').Router()
const patient = require('../controllers/patientController')
const auth = require('../middleware/auth')
const authPatient = require('../middleware/authPatient')

router.post('/alert', auth, authPatient, patient.newAlert)

router.get("/result", patient.trainAndPredict)
router.post("/result", patient.trainAndPredict)

module.exports = router