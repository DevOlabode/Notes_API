const express  = require('express');
const router = express.Router();


const catchAsync  = require('../utils/catchAsync');

const auth = require('../controllers/auth');

const { isLoggedIn } = require('../middleware')

router.post('/register', catchAsync(auth.register));

router.post('/login', auth.login);


router.post('/logout',isLoggedIn, catchAsync(auth.logout));

router.get('/profile', isLoggedIn, catchAsync(auth.profile));

module.exports = router;