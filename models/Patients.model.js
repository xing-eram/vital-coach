const { Schema, model } = require("mongoose");
const { userSchema } = require('./User.model');

const patientSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    birthday:{
        type: String,
        require: true
    },
    cellPhone:{
        type: Number,
        require: true
    },
    image:{
        type: String,
        default: '../public/images/default-profile.png'
    },
    user: { type: Schema.ObjectId, ref: 'User' }
    
})
const Patient = model('Patient', patientSchema);
module.exports = Patient;