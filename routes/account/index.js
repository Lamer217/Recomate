const router = require('express').Router();
// const { query } = require('express');
const User = require('../../models/User');

router.put('/add-film', (req, res, next) => {
  // Assign the id from the body
  const { id, filmTitle } = req.body;
  console.log(id, filmTitle);

  // If no id or not long enough - respond with server error
  if (!id || id.length !== 24) {
    res.status(500).json({ errMessage: 'Internal server error. Invalid id.' });
    return;
  } else {
    /* If the id is OK, find user by id and check
     if likedFilms contains title already */
    User.findById(id)
      .then(userObj => {
        if (userObj.likedFilms.includes(filmTitle)) {
          // If already contains title - do nothing
          return;
        } else {
          // If doesn't contains - push new title to array
          User.findByIdAndUpdate(id, { $push: { likedFilms: filmTitle } }).then(
            () => {
              res.status(200);
            }
          );
        }
      })
      .catch(err => {
        next(err);
        res.status(500);
      });
  }
});

module.exports = router;
