const router = require('express').Router();
const User = require('../../models/User');
const axios = require('axios');

// Get the users likeFilms array
router.get('/:id', (req, res, next) => {
  // Assign the id
  const id = req.params.id;

  // If no id or not long enough - respond with server error
  if (!id || id.length !== 24) {
    res.status(500).json({ errMessage: 'Internal server error. Invalid id.' });
    return;
  } else {
    User.findById(id)
      .then(userObj => {
        // If no films in the array
        if (!userObj.likedFilms.length) {
          // Send error
          res.status(404).send({ errMessage: 'No liked films yet.' });
        } else {
          // Send the array content
          res.status(200).send(userObj.likedFilms);
        }
      })
      .catch(err => next(err));
  }
});

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
