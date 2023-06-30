const { Schema, model } = require("mongoose");
const { userSchema } = require('./User.model');
const { courseSchema } = require('./Courses.model');


const trainerSchema = new Schema({
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
    training:{
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
    user: { 
        type: Schema.ObjectId, 
        ref: 'User' },
    courses: 
    [
        { 
            type: Schema.ObjectId, 
            ref: 'User' 
        }
    ],
    schedules: 
    [ 
        { 
            type: Schema.ObjectId, 
            ref: 'Schedule'
        } 
    ]
})

const Trainer = model('Trainer', trainerSchema);
module.exports = Trainer;