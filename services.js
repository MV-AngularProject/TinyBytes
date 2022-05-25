const jwt = require('express-jwt');
const jwks = require('jwks-rsa')


const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-pbjxlbn7.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:8080',
  issuer: 'https://dev-pbjxlbn7.us.auth0.com/',
  algorithms: ['RS256']
});


module.exports = jwtCheck;

// requesting a token
// var request = require("request");

// var options = { method: 'POST',
//   url: 'https://dev-pbjxlbn7.us.auth0.com/oauth/token',
//   headers: { 'content-type': 'application/json' },
//   body: '{"client_id":"t2NMX5Urcw75wYZ60DdqU5hGef0kqrcs","client_secret":"tFk4iUQRhfislN-lWkw9WJ1765qbAXCdEz9uhj_JEyUmXVrzHI9Z3p1We0mTD1en","audience":"http://localhost:8080","grant_type":"client_credentials"}' };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);


// sending the token to the api
// const axios = require("axios");

// const options = { 
//   method: "GET",
//   url: "http://path_to_your_api/",
//   headers: { "authorization": "Bearer TOKEN" },
// };

// axios(options)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });