const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/cars';

mongoose.connect(URI)
.then(db=>console.log('DB Connected'))
.catch(err=>console.log(err));

module.exports = mongoose;