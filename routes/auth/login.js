const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
  const { user, password } = req.body;

  // Check for user & password to be provided
  if (!user || !password) {
    res.status(400).json({ errMessage: 'Provide email and password.' });
    return;
  }

  // Check the DB for a user with provided username
  User.findOne({ username })
    .then(foundUser => {
      // If the user not found - return error
      if (!foundUser) {
        res.status(401).json({ errMessage: 'User not found.' });
        return;
      }

      // Compare provided password with the one from the DB
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, username } = foundUser;

        // Now with it create the object to use as JWT token payload
        const payload = { _id, username };

        // Create and sign the token
        const authToken = jwt.sign(
          payload, // id and username
          process.env.TOKEN_SECRET, // our secret to encrypt the token
          { algorithm: 'HS256', expiresIn: '12h' } // header object
        );

        // Send the authToken as the response
        res.status(200).json(authToken);
      } else {
        // If password is incorrect
        res.status(401).json({ errMessage: 'Failed to authenticate' });
      }
    })
    .catch(err => {
      res.status(500).json({ errMessage: 'Internal server error' });
      next(err);
    });
});

module.exports = router;
