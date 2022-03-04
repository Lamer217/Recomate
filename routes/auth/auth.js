const router = require('express').Router();

// Signup route prefix:
const Signup = require('./signup');
router.use('/signup', Signup);

// Login route prefix:
const Login = require('./login');
router.use('/login', Login);

// GET 'auth/verify' Used to verify JWT storet at the client
const Verify = require('./verify');
router.use('/verify', Verify);

module.exports = router;
