const router = require('express').Router();
const {User, Recipe}= require('../db/associations');

const bcrypt = require('bcrypt');
const SALT = 2;


// sign up
router.post('/chefs', async (req,res)=>{
    console.log('post hit')
    // bcrypt.hash(req.body.password,SALT, async function(err, hash){
    //      await User.create({...req.body, 'password':hash})
    // })
    
    res.status(200).send({message: 'Successfully signed up'})
})
module.exports= router;