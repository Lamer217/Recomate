const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// /api/signup

router.post('/', (req, res, next) => {
  const { username, password } = req.body;

  // hash the password
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  // create new user
  return User.create({ username, password: hashedPassword })
    .then(createdUser => {
      //   console.log(createdUser);
      const { username, _id } = createdUser;
      const user = { username, _id };
      // respond to client with user object
      res.status(201).json({ user });
    })
    .catch(err => next(err));
});

module.exports = router;
