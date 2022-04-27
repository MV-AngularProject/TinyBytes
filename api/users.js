const router = require('express').Router();
const {User, Recipe}= require('../db/assocations');

const bcrypt = require('bcrypt');
const SALT = 2;


// sign up
router.post('/signup', async (req,res)=>{
    bcrypt.hash(req.body.password,SALT, async function(err, hash){
         await User.create({...req.body, 'password':hash})
    })
    
    res.status(200).send({message: 'Successfully signed up'})
})