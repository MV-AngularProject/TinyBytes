const db = require('./db');
const fs = require('fs').promises;
const path = require('path');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
require('./associations');

const seedUser = async () => {
  const seedPath = path.join(__dirname, './seedData/users.json');
  const buffer = await fs.readFile(seedPath);
  const users = JSON.parse(String(buffer));

  users.forEach(async (user) => await User.create(user));
};

const seedRecipe = async () => {
  const seedPath = path.join(__dirname, './seedData/recipes.json');
  const buffer = await fs.readFile(seedPath);
  const recipes = JSON.parse(String(buffer));

  recipes.forEach(async (recipe) => await Recipe.create(recipe));
};

const matchUserWithRecipes = async () => {};

const generateData = async () => {
  //Seed individual model data
  seedUser();
  // seedRecipe();

  //Create relationships between individual model data
  // matchUserWithRecipes()
};

generateData();
