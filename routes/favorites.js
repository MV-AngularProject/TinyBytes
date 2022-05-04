const router = require('express').Router();
const {User, Recipe}= require('../db/associations');

router.get('/favorites', async (req,res)=>{
    // const user = User.findAll()
    // const favorites = Favorites.findAll(where:{
    //     user = req.params.user
    // })
})