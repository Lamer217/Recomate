const router = require('express').Router();
const { isAuthenticated } = require('../middleware/middleware');

// GET 'auth/verify' Used to verify JWT storet at the client

router.get('/', isAuthenticated, (req, res, next) => {
  /* If JWT token is valid the payload gets decoded by the
    isAuthenticated middleware and made available on 'req.payload' */
  console.log('req.payload', req.payload);

  /* Send back the object with the user data
    previously set as the token payload */
  res.status(200).json(req.payload);
});

module.exports = router;
