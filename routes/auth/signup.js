const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

// /api/signup

router.post('/', (req, res, next) => {
  const { username, password } = req.body;

  // Check for username & password to be provided
  if (!username || !password) {
    res.status(400).json({ errMessage: 'Provide username and password' });
    return;
  }

  /* Check if the username is already taken
  even though the user model is set to only create a new user with
  a unique username. A proper error message has to be sent
  to the user trying to register on the front-end */
  User.findOne({ username }).then(retrievedUser => {
    if (retrievedUser) {
      res.status(400).json({ errMessage: 'Username already taken' });
      return;
    }
  });

  // hash the password
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  // create new user
  return User.create({ username, password: hashedPassword })
    .then(createdUser => {
      //   console.log(createdUser);
      const { username, _id } = createdUser;
      // User object will be used as a JWT payload
      const user = { _id, username };
      // respond to client with user object
      res.status(201).json({ user });
    })
    .catch(err => next(err));
});

module.exports = router;
