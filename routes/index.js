const router = require('express').Router();
const userRoute = require('./users')
const favoritesRoute = require('./favorites')
const profileRoute = require('./profile')
const publicApiRoute =  require('./publicFacingAPIs')

router.use('/', userRoute)
router.use('/user', favoritesRoute)
router.use('/profile', profileRoute)
router.use('/publicApi', publicApiRoute);

module.exports = router;
