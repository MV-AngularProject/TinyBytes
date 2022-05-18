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

const randNum = () => {
  const recipiesLength = 8;
  return Math.round(Math.random() * (recipiesLength - 1));
};

const matchUserWithRecipes = async () => {
  const userInstances = await User.findAll();
  const recipeInstances = await Recipe.findAll();
  userInstances.forEach(async (user) => {
    let recipeIds = [];
    for (let i = 0; i < randNum() + 1; i += 1) {
      let recipeId = randNum();
      do {
        recipeId = randNum();
      } while (recipeIds.includes(recipeId));
      recipeIds.push(recipeId);
      await user.addRecipe(recipeInstances[recipeId]);
    }
  });
};

const generateData = async () => {
  await db.sync({force: true});

  //Seed individual model data
  await seedUser();
  await seedRecipe();

  //Create relationships between individual model data
  await matchUserWithRecipes();

  console.log('Database seeded!');
};

generateData();
