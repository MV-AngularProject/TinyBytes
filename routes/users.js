const router = require('express').Router();
const {User, Recipe}= require('../db/associations');

const bcrypt = require('bcrypt');
const SALT = 2;


// sign up
router.post('/chefs', async (req,res)=>{
    console.log('post hit')
try {
    const newUSer = await User.create(req.body)
    console.log('HEREREEEE', newUSer)
    res.json({newUSer})
    
} catch (error) {
    console.log(error)
    
}
   
})
module.exports= router;