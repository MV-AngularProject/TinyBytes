const express = require('express');
const app = express();
const request = require('request');
const PORT = 8080;

// const bcrypt = require('bcrypt');
// const SALT = 2;
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('./api/users'))
// app.post('/chefs', async (req,res)=>{
//     bcrypt.hash(req.body.password,SALT, async function(err, hash){
//          await User.create({...req.body, 'password':hash})
//     })
    
//     res.status(200).send({message: 'Successfully signed up'})
// })

// app.use('/',require('./api'))

app.get('/search/:query', function (req, res) {
  request({
    method: 'GET',
    uri: `https://api.spoonacular.com/recipes/complexSearch?apiKey=a42bca2f8c2f4c5194cd8aa86c365de7&query=${req.params.query}&number=8`,
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

  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
