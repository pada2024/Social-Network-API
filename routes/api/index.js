const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const thoughtRoutes = require('./thoughtsRoutes');

// router.use('/thoughts', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;