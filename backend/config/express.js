const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')


module.exports = function () {
  const app = express()
  app.use(express.json())
  app.use(cookieParser())

  app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


  // Load the routing files
  app.use('/api/user', require('../app/routes/userRoute'));
  app.use('/api/nurse', require('../app/routes/nurseRoute.js'));
  app.use('/api/patient', require('../app/routes/patientRoute.js'));

  return app
}