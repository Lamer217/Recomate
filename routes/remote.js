const router = require('express').Router();
const axios = require('axios');

// /api/remote
router.get('/similar/movies/:query', function (req, res, next) {
  // `https://tastedive.com/api/similar?q=${query}&k=${process.env.REACT_APP_API_KEY}&type=movies`
  const query = req.params.query;
  axios
    .get(
      `https://tastedive.com/api/similar?q=${query}&k=${process.env.API_KEY}&type=movies`
    )
    .then(response => res.status(200).send(response.data))
    .catch(err => next(err));
});

module.exports = router;
