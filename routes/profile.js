const router = require('express').Router();
const {User} = require('../db/associations');

router.get('/:userId', async (req, res) => {
  //Authorization first (will do later)
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    if (user) {
      const context = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        developer: user.developer,
        apiKey: user.apiKey,
      };
      res.status(200).json(context);
    } else {
      res.status(404).send(`No current user exist by this userId: ${req.params.userId}.`);
    }
  } catch (error) {
    res.status(500).send(`Server error, please try again at a later time. Error: ${error}`);
  }
});

router.post('/:userId', async (req, res) => {
  //Authorization first (will do later)
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    if (user) {
      user.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      });
      if (req.body.password) {
        user.set({password: req.body.password});
      }
      res.status(200).send(`Profile information was successfully updated for ${req.body.firstName} ${req.body.lastName}.`);
    } else {
      res.status(409).send(`No current user exist by this userId: ${req.params.userId}.`);
    }
  } catch (error) {
    res.status(500).send(`Could not update the profile information for ${req.body.firstName} ${req.body.lastName}. This is due to the following server error: ${error}`);
  }
});

module.exports = router;
