const express = require('express')

// controlerfunc
const { signupUser , loginUser} = require('../controllers/userCtrl')

const router = express.Router()

// login route
router.post('/login' , loginUser)

// signUP route
router.post('/signup' , signupUser)


module.exports = router;