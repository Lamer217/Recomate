const router = require('express').Router();
const axios = require('axios');

// /api/remote
router.get('/similar/movies/:query', function (req, res, next) {
  // `https://tastedive.com/api/similar?q=${query}&k=${process.env.REACT_APP_API_KEY}&type=movies`
  const query = req.params.query;
  axios
    .get(
      `https://tastedive.com/api/similar?q=${query}&k=${process.env.TASTE_DIVE_API_KEY}&type=movies&info=1`
    )
    .then(response => res.status(200).send(response.data))
    .catch(err => next(err));
});

router.get('/movies/search/:query', function (req, res, next) {
  // https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}
  const query = req.params.query;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    )
    .then(response => res.send(response.data.results))
    .catch(err => next(err));
});

module.exports = router;
