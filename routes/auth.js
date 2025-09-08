const express  = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

const ExpressError  = require('../utils/expressError');
const catchAsync  = require('../utils/catchAsync');

const {isLoggedIn} = require('../middleware')

router.post('/register', catchAsync(async(req, res)=>{
    const {email, password, username} = req.body;
    const user = await User.register(new User({ email, username }), password);
    await user.save();

    res.status(201).json({msg : 'User registered successfully'});
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return res.status(401).json({ msg: info.message || 'Login failed' });
    }

    req.logIn(user, (err) => {
        if (err) {
            return next(err)
        }
            return res.status(200).json({ msg: 'Logged in successfully' });
        });
    })(req, res, next);
});


router.post('/logout',isLoggedIn, catchAsync(async(req, res)=>{
    req.logout(function(err){
        if(err) return next(err)
        req.session.destroy(()=>{
        res.status(201).json({msg : 'Logged out successfully'})
    })
    })
}));

router.get('/profile', isLoggedIn, catchAsync(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(!user) throw new ExpressError('User not found', 404);
    res.status(200).json(user)
}));

module.exports = router;