const { Schema, model } = require("mongoose");
const { userSchema } = require('./User.model');

const patientSchema = new Schema({
    name: {
        type: String,
    },
    lastName:{
        type: String,
    },
    gender:{
        type: String,
        enum: ['Female', 'Male'],
    },
    from:{
        type: String,
        require: true
    },
    birthday:{
        type: String
    },
    cellPhone:{
        type: Number,
       
    },
    weight:{
        type: Number
    },
    waist:{
        type: Number
    },
    image:{
        type: String,
      default: "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png"
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    trainers: [{
        type: Schema.Types.ObjectId,
        ref: 'Trainer'
    }]
    
})
const Patient = model('Patient', patientSchema);
module.exports = Patient;