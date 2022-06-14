const router = require("express").Router();
const userRoute = require('./users')
const favoritesRoute = require('./favorites')
const profileRoute = require('./profile')

router.use('/user', userRoute)
router.use('/user/:id/favorites', favoritesRoute)
router.use('/profile', profileRoute)

module.exports = router;