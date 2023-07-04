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
        enum: ['Female', 'Male'],
        require: true
    },
    from:{
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
      default: "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png"
    },
    user: { type: Schema.ObjectId, ref: 'User' }
    
})
const Patient = model('Patient', patientSchema);
module.exports = Patient;