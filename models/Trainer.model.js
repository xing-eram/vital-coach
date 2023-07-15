const { Schema, model } = require("mongoose");
const { userSchema } = require('./User.model');
const { courseSchema } = require('./Courses.model');


const trainerSchema = new Schema({
    name: {
        type: String
    },
    lastName:{
        type: String
    },
    gender:{
        type: String,
        enum: ['Female', 'Male']
    },
    from:{
        type: String
    },
    birthday:{
        type: String
    },
    cellPhone:{
        type: String
    },
    training:{
        type: String
    },
    description:{
        type: String
    },
    price:{
        type: Number
    },
    imageProfile:{
        type: String,
        default: "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png"
    },
    images: [String],
    courses:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    patients:[{
        type: Schema.Types.ObjectId, 
        ref: 'Patient'
    }]
})

const Trainer = model('Trainer', trainerSchema);
module.exports = Trainer;