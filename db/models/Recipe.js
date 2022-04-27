const Sequelize = require("sequelize");
const db = require("../db");

class Recipe extends Model {
    // add methods here
    
  }

Recipe.init({
    
    recipeId: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    name: DataTypes.STRING,

    
  }, {
    sequelize: db,
    timestamps: false,
  });
  
module.exports = Recipe;
 
