const User = require("./models/User");
const Recipe = require("./models/Recipe");
const {Model, DataTypes} = require("sequelize");
const db = require("./db");
const Review = require("./models/Review");

// const Favorites = db.define('Favorites', {
//     // favorite_id: {
//     //     primaryKey: true,
//     //     type: DataTypes.INTEGER
//     // }
// })

// Favorites.belongsTo(User, {
//     as: 'user',
//     through: 'Favorites',
//     foreignKey: 'favorite_id'
// })

// User.hasMany(Favorites, { as: 'Favorites' })

User.belongsToMany(Recipe, {through: "Favorites"});
Recipe.belongsToMany(User, {through: "Favorites"});
Review.belongsToMany(Recipe, {
    through: "RecipeReview"});
Recipe.belongsToMany(Review, {
    through: "RecipeReview"});

module.exports = {db, User, Recipe, Review};
