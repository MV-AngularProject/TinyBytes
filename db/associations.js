const User = require('./models/User');
const Recipe = require('./models/Recipe');
const db = require('./db');

User.hasMany(Recipe);
Recipe.belongsTo(User);

User.belongsToMany(Recipe, {through: 'Favorites'});
Recipe.belongsToMany(User, {through: 'Favorites'});

module.exports = {db, User, Recipe};
