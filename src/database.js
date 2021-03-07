const mongoose = require('mongoose');

const URI = 'mongodb+srv://carsuser:mbYo85JWysMwE9Qi@cluster0.zmfb3.mongodb.net/Cars?retryWrites=true&w=majority';

mongoose.connect(URI)
.then(db=>console.log('DB Connected'))
.catch(err=>console.log(err));





module.exports = mongoose;