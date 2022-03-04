const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

// Remote api prefix:
const remoteApi = require('./remote');
router.use('/remote', remoteApi);

// Auth middleware route prefix:
// const AuthMiddleware = require('./auth/middleware');
// router.use('/auth/middleware', AuthMiddleware);

module.exports = router;
