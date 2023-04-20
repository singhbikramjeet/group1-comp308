const router = require('express').Router()
const user = require('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/', user.register)

router.post('/login', user.login)

router.get('/logout', user.logout)

router.get('/userinfo', auth, user.getUserInfo)

router.post('/newVitals', auth, user.newVitals)

router.post('/newMotivationalTips', auth, user.newMotivationalTips)

module.exports = router