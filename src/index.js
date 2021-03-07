const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require ('path');

const {Mongoose} = require('./database');
//settings
app.set('port', process.env.PORT||3000);
//middleware
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api/cars',require('./routes/car.routes'));
//static files
app.use(express.static(path.join(__dirname,'public')));
//starting server
app.listen(app.get('port'), ()=>{
    console.log('Server running');
});