const express = require('express');
const bodyParser =require ('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// panggil route routes

var routes =  require('./routes');
routes(app); /*panggil fungsi app di route.js */


// 
app.listen(3000, () => {
    console.log(`Server started on port`);
});