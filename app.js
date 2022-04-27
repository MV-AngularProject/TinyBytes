const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use('/',require('./api'))


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
