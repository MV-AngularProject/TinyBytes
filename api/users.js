const router = require('express').Router();
const {User, Recipe}= require('../db/associations');

const bcrypt = require('bcrypt');
const SALT = 2;


// sign up
router.post('/signup', async (req,res)=>{
    bcrypt.hash(req.body.password,SALT, async function(err, hash){
         await User.create({...req.body, 'password':hash})
    })
    
    res.status(200).send({message: 'Successfully signed up'})
})



router.get('/profile/:userId', async (req, res)=>{
  //Authorization first (will do later)
  const user = await User.findByPk(req.params.userId)
  const context = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }
  res.json(context)
})

// router.post('/profile/:userId', async (req, res)=>{
//   //Authorization first (will do later)
//   const user = await User.findByPk(req.params.userId)
//   user.set({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.passsword,
//   })
//   res.send
// })


module.exports = router;