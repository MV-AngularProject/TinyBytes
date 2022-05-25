const express = require('express');
const app = express();
const request = require('request');
const PORT = 8080;
const cors = require('cors')


app.use(cors())

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//api keys
apiKey = 'a42bca2f8c2f4c5194cd8aa86c365de7';
// apiKey='b989a147ccb6450e920e8fa5355c632c';
// apiKey = 'dd0d974a8e534716a3175c56ecd0bde5';
// apiKey = '0550322f781e49199dd00666b1933e64';
// apiKey = 'b989a147ccb6450e920e8fa5355c632c';
// apiKey = "f082f3f33d8e400b8898966f7fcbc069";

//api calls
// app.get('/', (req, res) => {
//   res.send('<h1>App Running</h1>')
// })
//homepage api calls

function callAPI(url, consoleWord) {
  request({
    method: 'GET',
    uri: `${url}&apiKey=${apiKey}`,
  }, function (error, response, body) {
    if (error) {
      console.log('Error with server', error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log(`${consoleWord}`, apiData)
    if (response.statusCode == 200) {
      console.log('success');
    }
    else {
      console.log("error with api call")
    }
  })
}
// app.get('/randomRecipe', async (req, res) =>{
//   let recipe = callAPI("https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1",
//     "Random").pipe(res)
// });
// homepage routes
app.get('/randomRecipe', async (req, res) => {
  request({
    method: 'GET',
    uri: `https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1&apiKey=${apiKey}`,
  }, function (error, response, body) {
    if (error) {
      console.log('Error with server', error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log('Dessert: ', apiData)
  }).pipe(res)
});
app.get('/dessertRecipe', async (req, res) => {
  request({
    method: 'GET',
    uri: `https://api.spoonacular.com/recipes/complexSearch?type=dessert&number=3&apiKey=${apiKey}`,
  }, function (error, response, body) {
    if (error) {
      console.log('Error with server', error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log('Dessert: ', apiData)
    if (response.statusCode == 200) {
      console.log('success');
    }
    else {
      console.log("error with api call")
    }
  }).pipe(res)
});
app.get('/popularRecipe', async (req, res) => {
  request({
    method: 'GET',
    uri:`https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=3&apiKey=${apiKey}`,
  }, function (error, response, body) {
    if (error) {
      console.log('Error with server', error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log('Popular: ', apiData)
    if (response.statusCode == 200) {
      console.log('success');
    }
    else {
      console.log("error with api call")
    }
  }).pipe(res)
});

//search page 
app.get('/search/:query', async (req, res) => {
  request({
    method: 'GET',
    uri: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${req.params.query}&number=8`,
  }, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log('Returned: ', apiData)
    if (response.statusCode == 200) {
      console.log('success');
    }
    else {
      console.log("error with api call")
    }
    }). pipe(res)
});
  
//single recipe page
app.get('/recipeDetails/:recipeId', async (req, res) => {
  request({
    method: 'GET',
    uri: `https://api.spoonacular.com/recipes/${req.params.recipeId}/information?apiKey=${apiKey}`,
  }, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log('Returned: ', apiData)
    if (response.statusCode == 200) {
      console.log('success');
    }
    else {
      console.log("error with api call")
    }
    }). pipe(res)
});
app.get('/recipeInstructions/:recipeId', async (req, res) => {
  request({
    method: 'GET',
    uri: `https://api.spoonacular.com/recipes/${req.params.recipeId}/analyzedInstructions?apiKey=${apiKey}`,
  }, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log('Returned: ', apiData)
    if (response.statusCode == 200) {
      console.log('success');
    }
    else {
      console.log("error with api call")
    }
    }). pipe(res)
});

app.get('/HTMLNutritionFacts/:recipeId', async (req, res) => {
  request({
    method: 'GET',
    uri: `https://api.spoonacular.com/recipes/${req.params.recipeId}/nutritionLabel?apiKey=${apiKey}`,
  }, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    const data = response.body;
    const apiData = JSON.parse(data)
    console.log('Returned: ', apiData)
    if (response.statusCode == 200) {
      console.log('success');
    }
    else {
      console.log("error with api call")
    }
    }). pipe(res)
});

  app.use('/',require('./routes'))



  
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
