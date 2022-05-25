const router = require('express').Router();

router.use('/', require('./users'));
router.use('/profile', require('./profile'));
router.use('/publicApi', require('./publicFacingAPIs'));

module.exports = router;
