const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');

const app = express();
const port = 3000;

//Morgan loggers
// app.use(morgan('combined'))

//middleware
app.use(express.urlencoded({
  extended: true,
})); //Post method
app.use(express.json()); //XMLHttpRequest, fetch, axios, etc

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Template engines
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});