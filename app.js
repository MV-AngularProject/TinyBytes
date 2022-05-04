const express = require('express');
const app = express();
const PORT = 8080;

// const {User, Recipe}= require('./db/associations');

// const bcrypt = require('bcrypt');
// const SALT = 2;
app.use('/',require('./routes'))
console.log('b4')
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('./routes'))
console.log('after')
// app.post('/chefs', async (req,res)=>{
//     bcrypt.hash(req.body.password,SALT, async function(err, hash){
//          await User.create({...req.body, 'password':hash})
//     })
    
//     res.status(200).send({message: 'Successfully signed up'})
// })
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
