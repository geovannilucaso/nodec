const mongoose = require('mongoose');
const { stringify } = require('qs');
const {Schema} = mongoose;

const carSchema = new Schema({
    description:{type: String},
    make : {type:String},
    model : {type:String},
    estimatedate : {type:String},
    id : {type:Number},
    image:{type: String},
    km: {type:Number},
    maintenance: {type: Boolean},
    person:{type:String}

});
module.exports = mongoose.model('cars', carSchema);