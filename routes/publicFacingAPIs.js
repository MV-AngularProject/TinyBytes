const router = require('express').Router();
const {db, User, Recipe} = require('../db/associations');
const {QueryTypes} = require('sequelize');

router.get('/topRecipies/:apiKey', async (req, res) => {
  const apiKey = req.params.apiKey;
  try {
    const user = await User.findOne({where: {apiKey: apiKey}})
    //Could potentially save the api call to keep track of how many requests the user made and implement a cap
    if(user){
      console.log('topRecipies route hit');
      const query = `SELECT Recipes.recipeId, Recipes.name, COUNT(Favorites.RecipeId) as Favorite_Count
                      FROM Favorites
                      JOIN Recipes on Recipes.id = Favorites.RecipeId 
                      GROUP BY Favorites.RecipeId 
                      ORDER BY COUNT(Favorites.RecipeId) 
                      DESC 
                      LIMIT 5`
      const topRecipes = await db.query(query, {type: QueryTypes.SELECT})
      res.status(200).json(topRecipes);
    } else {
      res.status(403).send(`Unauthorized request, Api Key: ${apiKey} is NOT Valid.`)
    }
  } catch (error) {
    res.status(500).send(`Server error: ${error}, could not access the server to return the top recipes.`)
  }
});

//Added in the last week?
router.get('/latestFavorited/:apiKey', async (req, res) => {
  const apiKey = req.params.apiKey;
  try {
    const user = await User.findOne({where: {apiKey: apiKey}})
    if(user){

    } else {

    }
  } catch (error) {

  }
})


module.exports = router;
