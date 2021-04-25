const express = require('express');
const bodyParser =require ('body-parser');
const app = express();

var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// panggil route routes

var routes =  require('./routes');
routes(app); /*panggil fungsi app di route.js */

// daftarkan menu routes dari index
app.use('/auth',require('./middleware'));
// 
app.listen(3000, () => {
    console.log(`Server started on port`);
});