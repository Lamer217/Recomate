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
      res.status(400).json({
        errMessage: 'Username already taken. Failed to register new user',
      });
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

      // Create and sign the token
      // (so the user doesn't have to login after the registration)
      const authToken = jwt.sign(
        user, // Token payload
        process.env.TOKEN_SECRET, // Secret to sign the token
        { algorithm: 'HS256', expiresIn: '6h' }
      );

      // Send the auth token as the response
      res.status(201).json({ authToken: authToken });
    })
    .catch(err => {
      res.status(500).json({ errMessage: 'Internal server error' });
      next(err);
    });
});

module.exports = router;
