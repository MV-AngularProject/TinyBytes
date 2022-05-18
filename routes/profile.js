
  
const router = require('express').Router();
const {User, Recipe} = require('../db/associations');

router.get('/profile/:userId', async (req, res) => {
  //Authorization first (will do later)
  try {
    const user = await User.findByPk(req.params.userId);
    if(user){
      const context = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        developer: user.developer,
        apiKey: user.apiKey,
      };
      res.status(200).send(context);
    } else {
      res.status(404).send(`No current user exist by this userId: ${req.params.userId}.`)
    }
  } catch (error) {
    res.status(500).send('Server error, please try again at a later time')
  }
});

router.post('/profile/:userId', async (req, res) => {
  //Authorization first (will do later)
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      user.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.passsword,
      });
    //the message could also be done on the front-end after checking that a 200 status code was recieved
    res.status(200).send(`Profile information was successfully updated for ${req.body.firstName} ${req.body.lastName}.`);
    } else {
      res.status(404).send(`No current user exist by this userId: ${req.params.userId}.`)
    }
  } catch (error) {
    //the message could also be done on the front-end after checking that a 200 status code was recieved
    res.status(409).send(`Could not update the profile information for ${req.body.firstName} ${req.body.lastName}.`);
  }
});

module.exports = router;