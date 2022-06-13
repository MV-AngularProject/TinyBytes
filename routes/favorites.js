const express = require('express');
const router = require('express').Router();
const { User, Recipe } = require('../db/associations');
const app = express();
const basicAuth = require('express-basic-auth');
const dbAuthorizer = require ('../routes/auth')

app.use(basicAuth({
    authorizer : dbAuthorizer,
    authorizeAsync: true,
    challenge: true,
    unauthorizedResponse : () => "You do not have access to this content. Please log in"
}))

router.get('user/:userId/favorites', async (req,res,next)=>{
    const user = await User.findByPK(req.params.userId,{
        include: [{
            model: Recipe,
            through: { attributes: ["RecipeId"] }
        }]
    })
    res.send(user)
})
router.post('user/:userId/favorites', async (req,res,next)=> {

    try {
        const user= await User.findByPK(req.params.userId,{
            include: [{
                model: Recipe,
                through: { attributes: ["RecipeId"] }
            }]
        })
        const favorite = await user.create(req.body)
        res.status(200).json(favorite)
      } 
      catch (error) {
        next(error)
      }

})

router.delete('user/:userId/favorites/:id', async (req,res,next)=>{
    try {
        const favorite = await User.findByPK(req.params.userId,{
            include: [{
                model: Recipe,
                through: { attributes: ["RecipeId"] }
            }]
        })
        res.send(200)
      } catch (error) {
        next(error)
      }
})
router.put('user/:id/favorites', async (req,res,next)=>{
    try {
        const user = await User.findByPK(req.params.userId,{
            include: [{
                model: Recipe,
                through: { attributes: ["RecipeId"] }
            }]
        })
        const favorite = await user.favorite.update(req.body, {
            where: {
              id: req.params.id
            }
          })

        let newFavorite = await favorite.findByPk(req.params.id);
        res.send(newFavorite)
    } catch (error) {
        next(error)
    }
})